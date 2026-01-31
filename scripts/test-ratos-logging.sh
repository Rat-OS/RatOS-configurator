#!/usr/bin/env bash

# RatOS Logging System Comprehensive Test Suite
# Tests the execute_with_logging function and related logging functionality
# Usage: ./test-ratos-logging.sh

set -eo pipefail

# NOTE: The actual test implementation is in test-ratos-logging-simple.sh
# This file serves as documentation for the comprehensive test requirements.

# Test configuration (for reference)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEST_LOG_FILE="/tmp/ratos-logging-test-$(date +%s).log"
TESTS_PASSED=0
TESTS_FAILED=0
FAILED_TESTS=()

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Cleanup function
cleanup() {
    # Clean up test files on exit
    rm -f "$TEST_LOG_FILE" 2>/dev/null || true
    rm -f /tmp/tmp.* 2>/dev/null || true
}

# Trap cleanup on exit
trap cleanup EXIT

# Logging functions for test output
test_log_test() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

test_log_pass() {
    echo -e "${GREEN}[PASS]${NC} $1"
    ((TESTS_PASSED++))
}

test_log_fail() {
    echo -e "${RED}[FAIL]${NC} $1"
    ((TESTS_FAILED++))
    FAILED_TESTS+=("$1")
}

test_log_info() {
    echo -e "${YELLOW}[INFO]${NC} $1"
}

# Setup test environment
setup_test_env() {
    test_log_info "Setting up test environment..."
    export RATOS_LOG_FILE="$TEST_LOG_FILE"
    export RATOS_LOG_LEVEL="debug"

    # Source the logging script
    local logging_script="$SCRIPT_DIR/../configuration/scripts/ratos-logging.sh"
    if [[ ! -f "$logging_script" ]]; then
        test_log_fail "ratos-logging.sh not found at $logging_script"
        exit 1
    fi

    # shellcheck source=configuration/scripts/ratos-logging.sh
    source "$logging_script"
    test_log_info "Test environment ready. Log file: $TEST_LOG_FILE"
}

# Validate JSON log entry
validate_json_log() {
    local expected_context="$1"
    local expected_error_code="$2"
    local expected_level="$3"
    local expected_msg_pattern="$4"
    
    # Get the last log entry
    local last_entry
    last_entry=$(tail -n 1 "$TEST_LOG_FILE" 2>/dev/null || echo "")
    
    if [[ -z "$last_entry" ]]; then
        return 1
    fi
    
    # Validate JSON structure
    if ! echo "$last_entry" | jq . >/dev/null 2>&1; then
        return 1
    fi
    
    # Extract fields
    local context level msg error_code
    context=$(echo "$last_entry" | jq -r '.context // empty')
    level=$(echo "$last_entry" | jq -r '.level // empty')
    msg=$(echo "$last_entry" | jq -r '.msg // empty')
    error_code=$(echo "$last_entry" | jq -r '.errorCode // empty')
    
    # Validate fields
    [[ "$context" == "$expected_context" ]] || return 1
    [[ "$level" == "$expected_level" ]] || return 1
    [[ "$msg" =~ $expected_msg_pattern ]] || return 1
    
    # Check error code if expected
    if [[ -n "$expected_error_code" && "$expected_error_code" != "none" ]]; then
        [[ "$error_code" == "$expected_error_code" ]] || return 1
    fi
    
    return 0
}

# Test 1: Parameter Order Validation
test_parameter_order() {
    test_log_test "Testing parameter order validation..."

    # Clear log file for this test
    true > "$TEST_LOG_FILE"

    # Test correct parameter order with execute_with_logging
    if execute_with_logging "test_context" "TEST_ERROR" echo "Parameter order test" >/dev/null; then
        # Give logging a moment to complete
        sleep 0.1
        # Check if the log contains the expected context and success message
        if grep -q '"context":"test_context"' "$TEST_LOG_FILE" && grep -q '"msg":"Command completed successfully: echo Parameter order test"' "$TEST_LOG_FILE"; then
            test_log_pass "Parameter order validation - correct order accepted"
        else
            test_log_fail "Parameter order validation - logging validation failed"
        fi
    else
        test_log_fail "Parameter order validation - function execution failed"
    fi
}

# Test 2: Command Output Display
test_command_output_display() {
    test_log_test "Testing command output display..."
    
    # Capture output to verify it's displayed
    local output
    output=$(execute_with_logging "output_test" "OUTPUT_ERROR" echo "This should be visible" 2>&1)
    
    if [[ "$output" =~ "This should be visible" ]]; then
        test_log_pass "Command output display - output visible to user"
    else
        test_log_fail "Command output display - output not visible to user"
    fi
}

# Test 3: Logging Functionality
test_logging_functionality() {
    test_log_test "Testing logging functionality..."
    
    # Clear log file
    true > "$TEST_LOG_FILE"
    
    # Test successful command logging
    execute_with_logging "log_test" "LOG_ERROR" echo "Logging test" >/dev/null
    
    # Check for debug log (command execution)
    if grep -q '"level":20.*"msg":"Executing command: echo Logging test"' "$TEST_LOG_FILE"; then
        test_log_pass "Logging functionality - debug log entry created"
    else
        test_log_fail "Logging functionality - debug log entry missing"
    fi
    
    # Check for info log (command success)
    if grep -q '"level":30.*"msg":"Command completed successfully: echo Logging test"' "$TEST_LOG_FILE"; then
        test_log_pass "Logging functionality - info log entry created"
    else
        test_log_fail "Logging functionality - info log entry missing"
    fi
    
    # Check for context preservation
    if grep -q '"context":"log_test"' "$TEST_LOG_FILE"; then
        test_log_pass "Logging functionality - context preserved"
    else
        test_log_fail "Logging functionality - context not preserved"
    fi
}

# Test 4: Error Handling
test_error_handling() {
    test_log_test "Testing error handling..."
    
    # Clear log file
    true > "$TEST_LOG_FILE"
    
    # Test failing command
    local exit_code=0
    execute_with_logging "error_test" "ERROR_CODE_TEST" bash -c "exit 42" >/dev/null || exit_code=$?
    
    # Check exit code preservation
    if [[ $exit_code -eq 42 ]]; then
        test_log_pass "Error handling - exit code preserved"
    else
        test_log_fail "Error handling - exit code not preserved (got $exit_code, expected 42)"
    fi
    
    # Check error logging
    if grep -q '"level":50.*"msg":"Command failed with exit code 42' "$TEST_LOG_FILE"; then
        test_log_pass "Error handling - error log entry created"
    else
        test_log_fail "Error handling - error log entry missing"
    fi
    
    # Check error code in log
    if grep -q '"errorCode":"ERROR_CODE_TEST"' "$TEST_LOG_FILE"; then
        test_log_pass "Error handling - error code logged"
    else
        test_log_fail "Error handling - error code not logged"
    fi
}

# Test 5: Real Usage Patterns from ratos-update.sh
test_real_usage_patterns() {
    test_log_test "Testing real usage patterns from ratos-update.sh..."

    # Test pattern from line 84 (sed command)
    if execute_with_logging "ensure_node_18" "NODE_REPO_UPDATE_FAILED" echo "Simulated sed command" >/dev/null 2>&1; then
        test_log_pass "Real usage patterns - line 84 pattern (sed command)"
    else
        test_log_fail "Real usage patterns - line 84 pattern failed"
    fi

    # Test pattern from line 85 (apt-get update)
    if execute_with_logging "ensure_node_18" "APT_UPDATE_FAILED" echo "Simulated apt-get update" >/dev/null 2>&1; then
        test_log_pass "Real usage patterns - line 85 pattern (apt-get update)"
    else
        test_log_fail "Real usage patterns - line 85 pattern failed"
    fi

    # Test pattern from line 86 (apt-get install)
    if execute_with_logging "ensure_node_18" "NODE_INSTALL_FAILED" echo "Simulated apt-get install" >/dev/null 2>&1; then
        test_log_pass "Real usage patterns - line 86 pattern (apt-get install)"
    else
        test_log_fail "Real usage patterns - line 86 pattern failed"
    fi

    # Test pattern from line 110 (chown command)
    if execute_with_logging "fix_klippy_env_ownership" "OWNERSHIP_CHANGE_FAILED" echo "Simulated chown command" >/dev/null 2>&1; then
        test_log_pass "Real usage patterns - line 110 pattern (chown command)"
    else
        test_log_fail "Real usage patterns - line 110 pattern failed"
    fi

    # Test pattern from line 128 (ratos extensions symlink)
    if execute_with_logging "symlink_extensions" "EXTENSION_SYMLINK_FAILED" echo "Simulated ratos extensions symlink" >/dev/null 2>&1; then
        test_log_pass "Real usage patterns - line 128 pattern (ratos extensions symlink)"
    else
        test_log_fail "Real usage patterns - line 128 pattern failed"
    fi
}

# Test 6: Edge Cases
test_edge_cases() {
    test_log_test "Testing edge cases..."

    # Test multiple arguments
    local output
    output=$(execute_with_logging "multi_arg_test" "MULTI_ARG_ERROR" echo "arg1" "arg2" "arg with spaces" 2>&1)
    if [[ "$output" =~ "arg1 arg2 arg with spaces" ]]; then
        test_log_pass "Edge cases - multiple arguments handled correctly"
    else
        test_log_fail "Edge cases - multiple arguments not handled correctly"
    fi

    # Test stdout and stderr capture
    output=$(execute_with_logging "stderr_test" "STDERR_ERROR" bash -c 'echo "stdout"; echo "stderr" >&2' 2>&1)
    if [[ "$output" =~ "stdout" && "$output" =~ "stderr" ]]; then
        test_log_pass "Edge cases - stdout and stderr both captured and displayed"
    else
        test_log_fail "Edge cases - stdout/stderr not properly handled"
    fi

    # Test complex command with pipes (simulated)
    if execute_with_logging "complex_test" "COMPLEX_ERROR" bash -c 'echo "test" | cat' >/dev/null 2>&1; then
        test_log_pass "Edge cases - complex command with pipes"
    else
        test_log_fail "Edge cases - complex command failed"
    fi

    # Test command with special characters
    if execute_with_logging "special_chars" "SPECIAL_ERROR" echo "Special chars: \$HOME \"quotes\" \`backticks\`" >/dev/null 2>&1; then
        test_log_pass "Edge cases - special characters handled"
    else
        test_log_fail "Edge cases - special characters not handled"
    fi
}

# Test 7: JSON Structure Validation
test_json_structure() {
    test_log_test "Testing JSON log structure..."

    # Clear log file
    true > "$TEST_LOG_FILE"

    # Generate a log entry
    execute_with_logging "json_test" "JSON_ERROR" echo "JSON structure test" >/dev/null 2>&1

    # Validate each log entry is valid JSON
    local valid_json=true
    while IFS= read -r line; do
        if [[ -n "$line" ]] && ! echo "$line" | jq . >/dev/null 2>&1; then
            valid_json=false
            break
        fi
    done < "$TEST_LOG_FILE"

    if $valid_json; then
        test_log_pass "JSON structure - all log entries are valid JSON"
    else
        test_log_fail "JSON structure - invalid JSON found in log"
    fi

    # Check required fields in last entry
    local last_entry
    last_entry=$(tail -n 1 "$TEST_LOG_FILE")

    local required_fields=("level" "time" "msg" "source" "context" "pid" "hostname")
    local missing_fields=()

    for field in "${required_fields[@]}"; do
        if ! echo "$last_entry" | jq -e ".$field" >/dev/null 2>&1; then
            missing_fields+=("$field")
        fi
    done

    if [[ ${#missing_fields[@]} -eq 0 ]]; then
        test_log_pass "JSON structure - all required fields present"
    else
        test_log_fail "JSON structure - missing fields: ${missing_fields[*]}"
    fi
}

# Test 8: Performance and Cleanup
test_performance_cleanup() {
    test_log_test "Testing performance and cleanup..."

    # Test that temporary files are cleaned up
    local temp_files_before
    temp_files_before=$(find /tmp -name "tmp.*" -user "$(whoami)" 2>/dev/null | wc -l)

    # Run a command that should create and clean up temp files
    execute_with_logging "cleanup_test" "CLEANUP_ERROR" echo "Cleanup test" >/dev/null 2>&1

    local temp_files_after
    temp_files_after=$(find /tmp -name "tmp.*" -user "$(whoami)" 2>/dev/null | wc -l)

    # Allow for some temporary files (the function creates and cleans up temp files)
    # We just want to make sure it's not accumulating them
    if [[ $temp_files_after -le $((temp_files_before + 2)) ]]; then
        test_log_pass "Performance and cleanup - temporary files cleaned up"
    else
        test_log_fail "Performance and cleanup - temporary files accumulating"
    fi

    # Test that function completes in reasonable time (< 5 seconds for simple command)
    local start_time end_time duration
    start_time=$(date +%s)
    execute_with_logging "perf_test" "PERF_ERROR" echo "Performance test" >/dev/null 2>&1
    end_time=$(date +%s)
    duration=$((end_time - start_time))

    if [[ $duration -lt 5 ]]; then
        test_log_pass "Performance and cleanup - function completes in reasonable time"
    else
        test_log_fail "Performance and cleanup - function too slow ($duration seconds)"
    fi
}

# Print test summary
print_summary() {
    echo
    echo "=========================================="
    echo "         RatOS Logging Test Summary"
    echo "=========================================="
    echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
    echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
    echo -e "Total Tests:  $((TESTS_PASSED + TESTS_FAILED))"
    echo

    if [[ $TESTS_FAILED -gt 0 ]]; then
        echo -e "${RED}Failed Tests:${NC}"
        for test in "${FAILED_TESTS[@]}"; do
            echo -e "  ${RED}✗${NC} $test"
        done
        echo
        echo -e "${RED}❌ Some tests failed. Please review the logging implementation.${NC}"
        return 1
    else
        echo -e "${GREEN}🎉 All tests passed! The RatOS logging system is working correctly.${NC}"
        return 0
    fi
}

# Check dependencies
check_dependencies() {
    local missing_deps=()

    if ! command -v jq >/dev/null 2>&1; then
        missing_deps+=("jq")
    fi

    if [[ ${#missing_deps[@]} -gt 0 ]]; then
        test_log_fail "Missing dependencies: ${missing_deps[*]}"
        echo "Please install missing dependencies and try again."
        exit 1
    fi
}

# Main execution
main() {
    echo "=========================================="
    echo "    RatOS Logging System Test Suite"
    echo "=========================================="
    echo

    # Check dependencies
    check_dependencies

    # Setup test environment
    setup_test_env

    # Run all tests
    test_log_info "Running comprehensive logging tests..."
    echo

    # Run tests with error handling to prevent early exit
    test_parameter_order || true
    test_command_output_display || true
    test_logging_functionality || true
    test_error_handling || true
    test_real_usage_patterns || true
    test_edge_cases || true
    test_json_structure || true
    test_performance_cleanup || true

    # Print summary and exit with appropriate code
    if print_summary; then
        exit 0
    else
        exit 1
    fi
}

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
