#!/usr/bin/env bash

# Comprehensive test script for the RatOS logging system
# Tests all major features and functionality

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(realpath "$SCRIPT_DIR/..")"
TEST_LOG_FILE="/tmp/ratos-logging-system-test-$(date +%s).log"
TEST_CONFIG_FILE="/tmp/ratos-logging-test-config-$(date +%s).conf"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}RatOS Complete Logging System Test Suite${NC}"
echo "========================================"

# Test results tracking
TESTS_PASSED=0
TESTS_FAILED=0
FAILED_TESTS=()


# Test configuration
export RATOS_LOG_FILE="$TEST_LOG_FILE"
export RATOS_LOG_LEVEL="debug"
export RATOS_PERFORMANCE_MONITORING="true"
export RATOS_HEALTH_CHECKS="true"
export RATOS_CONSOLE_OUTPUT="false"

test_log_pass() {
    echo -e "${GREEN}✓ PASS${NC}: $1"
    ((++TESTS_PASSED))
}

test_log_fail() {
    echo -e "${RED}✗ FAIL${NC}: $1"
    ((++TESTS_FAILED))
    FAILED_TESTS+=("$1")
}

test_log_info() {
	echo -e "${BLUE}→ INFO${NC}: $1"
}

test_log_section() {
    echo -e "\n${YELLOW}=== $1 ===${NC}"
}

# Test 1: Basic logging functionality
test_basic_logging() {
    test_log_section "Testing Basic Logging Functionality"
    
    # Clear log file
    true > "$TEST_LOG_FILE"
    
    # Source the logging library
    if source "$BASE_DIR/configuration/scripts/ratos-logging.sh" 2>/dev/null; then

        test_log_pass "Logging library sourced successfully"
        
        # Test all log levels
        log_trace "Trace message" "test"
        log_debug "Debug message" "test"
        log_info "Info message" "test"
        log_warn "Warning message" "test"
        log_error "Error message" "test" "TEST_ERROR"
        
        # Check if messages were logged
        if grep -q "Info message" "$TEST_LOG_FILE"; then
            test_log_pass "Log messages written to file"
        else
            test_log_fail "Log messages not written to file"
        fi
        
        # Check JSON format
        if grep -q '"level":30' "$TEST_LOG_FILE"; then
            test_log_pass "JSON format logging works"
        else
            test_log_fail "JSON format logging failed"
        fi
        
    else
        test_log_fail "Failed to source logging library"
    fi
}

# Test 2: Configuration management
test_configuration_management() {
    test_log_section "Testing Configuration Management"
    
    # Source configuration management
    if source "$BASE_DIR/configuration/scripts/ratos-logging-config.sh" 2>/dev/null; then
        test_log_pass "Configuration management library sourced"
        
        # Create test configuration
        if create_default_config "$TEST_CONFIG_FILE"; then
            test_log_pass "Default configuration created"
            
            # Load configuration
            if load_logging_config "$TEST_CONFIG_FILE"; then
                test_log_pass "Configuration loaded successfully"
                
                # Update configuration
                if update_config "log_level" "trace" "$TEST_CONFIG_FILE"; then
                    test_log_pass "Configuration updated successfully"
                else
                    test_log_fail "Configuration update failed"
                fi
                
                # Validate configuration
                if validate_config; then
                    test_log_pass "Configuration validation passed"
                else
                    test_log_fail "Configuration validation failed"
                fi
                
            else
                test_log_fail "Configuration loading failed"
            fi
        else
            test_log_fail "Default configuration creation failed"
        fi
    else
        test_log_fail "Failed to source configuration management library"
    fi
}

# Test 3: Performance monitoring
test_performance_monitoring() {
    test_log_section "Testing Performance Monitoring"
    
    # Clear log file
    true > "$TEST_LOG_FILE"
    
    # Test timers
    start_timer "test_timer" "performance_test"
    sleep 0.1  # Small delay for measurable time
    local duration
    duration=$(stop_timer "test_timer" "performance_test")
    
    if [[ "$duration" -gt 0 ]]; then
        test_log_pass "Performance timer works (duration: ${duration}ms)"
    else
        test_log_fail "Performance timer failed"
    fi
    
    # Test counters
    increment_counter "test_counter" 5 "performance_test"
    local counter_value
    counter_value=$(get_counter "test_counter")
    
    if [[ "$counter_value" -eq 5 ]]; then
        test_log_pass "Performance counter works (value: $counter_value)"
    else
        test_log_fail "Performance counter failed (expected: 5, got: $counter_value)"
    fi
    
    # Test performance summary
    log_performance_summary "performance_test"
    
    if grep -q "Performance Summary" "$TEST_LOG_FILE"; then
        test_log_pass "Performance summary logged"
    else
        test_log_fail "Performance summary not logged"
    fi
}

# Test 4: Command execution with logging
test_command_execution() {
    test_log_section "Testing Command Execution with Logging"
    
    # Clear log file
    true > "$TEST_LOG_FILE"
    
    # Test successful command
    if execute_with_logging "test_context" "TEST_ERROR" echo "Test command output"; then
        test_log_pass "Successful command execution"
        
        if grep -q "Command completed successfully" "$TEST_LOG_FILE"; then
            test_log_pass "Successful command logged correctly"
        else
            test_log_fail "Successful command not logged correctly"
        fi
    else
        test_log_fail "Command execution failed unexpectedly"
    fi
    
    # Test failed command
    if ! execute_with_logging "test_context" "TEST_ERROR" false; then
        test_log_pass "Failed command detected correctly"
        
        if grep -q "Command failed" "$TEST_LOG_FILE"; then
            test_log_pass "Failed command logged correctly"
        else
            test_log_fail "Failed command not logged correctly"
        fi
    else
        test_log_fail "Failed command not detected"
    fi
}

# Test 5: Log rotation
test_log_rotation() {
    test_log_section "Testing Log Rotation"
    
    # Source log rotation library
    if source "$BASE_DIR/configuration/scripts/ratos-log-rotation.sh" 2>/dev/null; then
        test_log_pass "Log rotation library sourced"
        
        # Create a test log file with content
        local test_rotation_file
		test_rotation_file="/tmp/test-rotation-$(date +%s).log"
        echo "Test log content" > "$test_rotation_file"
        echo "More test content" >> "$test_rotation_file"
        
        # Test file size calculation
        local file_size
        file_size=$(get_file_size "$test_rotation_file")
        
        if [[ $file_size -gt 0 ]]; then
            test_log_pass "File size calculation works (size: $file_size bytes)"
        else
            test_log_fail "File size calculation failed"
        fi
        
		test_log_result=$(rotate_log_file "$test_rotation_file" "1" "2" "false")
		test_log_info "$test_log_result"
        # Test rotation (with very small size to force rotation)
        if grep -q "Rotating log file" "$test_log_result"; then
            test_log_pass "Log rotation executed"
            
            # Check if backup was created
            if [[ -f "${test_rotation_file}.1" ]]; then
                test_log_pass "Backup file created during rotation"
            else
                test_log_fail "Backup file not created during rotation"
            fi
        else
            test_log_fail "Log rotation failed"
        fi
        
        # Cleanup
        rm -f "$test_rotation_file" "${test_rotation_file}.1" 2>/dev/null || true
        
    else
        test_log_fail "Failed to source log rotation library"
    fi
}

# Test 6: Health checks
test_health_checks() {
    test_log_section "Testing Health Checks"
    
    # Clear log file
    true > "$TEST_LOG_FILE"
    
    # Test system resource check
    check_system_resources "health_test"
    
    if grep -q "health_test" "$TEST_LOG_FILE"; then
        test_log_pass "System resource check executed"
    else
        test_log_fail "System resource check not executed"
		cat "$TEST_LOG_FILE"
    fi
    
    # Test comprehensive health check
    log_health_check "health_test"
    
    if grep -q "Performing system health check" "$TEST_LOG_FILE"; then
        test_log_pass "Comprehensive health check executed"
    else
        test_log_fail "Comprehensive health check not executed"
    fi
}

# Test 7: Error handling
test_error_handling() {
    test_log_section "Testing Error Handling"
    
    # Clear log file
    true > "$TEST_LOG_FILE"
    
    # Test error trapping setup
    setup_error_trap "error_test"
    test_log_pass "Error trap setup completed"
    
    # Test script lifecycle logging
    log_script_start "test-script.sh" "1.0.0"
    log_script_complete "test-script.sh" "0"
    
    if grep -q "Starting test-script.sh" "$TEST_LOG_FILE"; then
        test_log_pass "Script lifecycle logging works"
    else
        test_log_fail "Script lifecycle logging failed"
    fi
}

# Test 8: Integration test
test_integration() {
    test_log_section "Testing Complete Integration"
    
    # Clear log file
    true > "$TEST_LOG_FILE"
    
    # Simulate a complete script execution
    local start_time
    start_time=$(get_timestamp)
    
    setup_error_trap "integration_test"
    log_script_start "integration-test.sh" "1.0.0"
    
    start_timer "integration_timer" "integration"
    
    test_log_info "Starting integration test"
    
    # Simulate some work
    execute_with_logging "integration" "WORK_FAILED" sleep 0.1
    increment_counter "operations_completed" 1 "integration"
    
    test_log_info "Integration test work completed"
    
    duration=$(stop_timer "integration_timer" "integration")
    test_log_pass "Simulated work duration: $duration ms"

    log_performance_summary "integration"
    
    create_log_summary "integration-test.sh" "$start_time"
    log_script_complete "integration-test.sh" "0"
    
    # Verify integration
    local log_entries
    log_entries=$(wc -l < "$TEST_LOG_FILE")
    
    if [[ $log_entries -gt 5 ]]; then
        test_log_pass "Integration test generated multiple log entries ($log_entries)"
    else
        test_log_fail "Integration test generated insufficient log entries ($log_entries)"
    fi
    
    if grep -q "integration-test.sh completed successfully" "$TEST_LOG_FILE"; then
        test_log_pass "Integration test completed successfully"
    else
        test_log_fail "Integration test completion not logged"
    fi
}

# Cleanup function
cleanup() {
    test_log_section "Cleaning up test environment"
    rm -f "$TEST_LOG_FILE" "$TEST_CONFIG_FILE" 2>/dev/null || true
    echo "Cleanup completed"
}

# Main test execution
main() {
    echo "Testing RatOS logging system components..."
    echo "Test log file: $TEST_LOG_FILE"
    echo "Test config file: $TEST_CONFIG_FILE"
    
    test_basic_logging
    test_configuration_management
    test_performance_monitoring
    test_command_execution
    test_log_rotation
    test_health_checks
    test_error_handling
    test_integration
    
    # Print summary
    test_log_section "Test Results Summary"
    echo -e "Tests passed: ${GREEN}$TESTS_PASSED${NC}"
    echo -e "Tests failed: ${RED}$TESTS_FAILED${NC}"
    
    if [[ $TESTS_FAILED -gt 0 ]]; then
        echo -e "\n${RED}Failed tests:${NC}"
        for test in "${FAILED_TESTS[@]}"; do
            echo -e "  ${RED}✗${NC} $test"
        done
        cleanup
        exit 1
    else
        echo -e "\n${GREEN}All tests passed! The RatOS logging system is working correctly.${NC}"
        cleanup
        exit 0
    fi
}

# Run tests
main "$@"
