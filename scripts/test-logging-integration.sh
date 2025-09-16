#!/usr/bin/env bash

# Test script to validate logging integration in all modified files
# This script tests that the logging functions are properly sourced and available

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(realpath "$SCRIPT_DIR/..")"
TEST_LOG_FILE="/tmp/logging-integration-test-$(date +%s).log"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}RatOS Logging Integration Test Suite${NC}"
echo "===================================="

# Test configuration
export RATOS_LOG_FILE="$TEST_LOG_FILE"
export RATOS_LOG_LEVEL="debug"

# Create test log file
touch "$TEST_LOG_FILE"

echo "Test log file: $TEST_LOG_FILE"

# Test results tracking
TESTS_PASSED=0
TESTS_FAILED=0
FAILED_TESTS=()

test_log_pass() {
    echo -e "${GREEN}✓ PASS${NC}: $1"
    ((TESTS_PASSED++))
}

test_log_fail() {
    echo -e "${RED}✗ FAIL${NC}: $1"
    ((TESTS_FAILED++))
    FAILED_TESTS+=("$1")
}

test_log_test() {
    echo -e "${BLUE}→ TEST${NC}: $1"
}

test_log_section() {
    echo -e "\n${YELLOW}=== $1 ===${NC}"
}

# Test 1: Test ratos-common.sh logging integration
test_ratos_common_logging() {
    test_log_section "Testing ratos-common.sh logging integration"
    
    # Clear log file
    true > "$TEST_LOG_FILE"
    
    # Source the script and test logging functions
    if source "$BASE_DIR/configuration/scripts/ratos-common.sh" 2>/dev/null; then
        test_log_pass "ratos-common.sh sourced successfully"
        
        # Test if logging functions are available
        if declare -f log_info >/dev/null 2>&1; then
            test_log_pass "log_info function available in ratos-common.sh"
        else
            test_log_fail "log_info function not available in ratos-common.sh"
        fi
        
        if declare -f execute_with_logging >/dev/null 2>&1; then
            test_log_pass "execute_with_logging function available in ratos-common.sh"
        else
            test_log_fail "execute_with_logging function not available in ratos-common.sh"
        fi
        
        # Test report_status function with logging
        report_status "Test status message"
        if grep -q "Test status message" "$TEST_LOG_FILE"; then
            test_log_pass "report_status function logs correctly"
        else
            test_log_fail "report_status function does not log"
        fi
        
    else
        test_log_fail "Failed to source ratos-common.sh"
    fi
}

# Test 2: Test src/scripts/common.sh logging integration
test_src_common_logging() {
    test_log_section "Testing src/scripts/common.sh logging integration"
    
    # Clear log file
    true > "$TEST_LOG_FILE"
    
    # Source the script and test logging functions
    if source "$BASE_DIR/src/scripts/common.sh" 2>/dev/null; then
        test_log_pass "src/scripts/common.sh sourced successfully"
        
        # Test if logging functions are available
        if declare -f log_info >/dev/null 2>&1; then
            test_log_pass "log_info function available in src/scripts/common.sh"
        else
            test_log_fail "log_info function not available in src/scripts/common.sh"
        fi
        
        # Test report_status function with logging
        report_status "Test status message from src common"
        if grep -q "Test status message from src common" "$TEST_LOG_FILE"; then
            test_log_pass "src/scripts/common.sh report_status function logs correctly"
        else
            test_log_fail "src/scripts/common.sh report_status function does not log"
        fi
        
    else
        test_log_fail "Failed to source src/scripts/common.sh"
    fi
}

# Test 3: Test script syntax validation
test_script_syntax() {
    test_log_section "Testing script syntax validation"
    
    local scripts=(
        "configuration/scripts/ratos-common.sh"
        "configuration/scripts/ratos-install.sh"
        "src/scripts/update.sh"
        "src/scripts/common.sh"
        "src/scripts/setup.sh"
    )
    
    for script in "${scripts[@]}"; do
        if bash -n "$BASE_DIR/$script" 2>/dev/null; then
            test_log_pass "Syntax validation passed for $script"
        else
            test_log_fail "Syntax validation failed for $script"
        fi
    done
}

# Test 4: Test logging function availability after sourcing
test_logging_function_availability() {
    test_log_section "Testing logging function availability"
    
    # Clear any previous sourcing
    unset -f log_info log_error execute_with_logging setup_error_trap 2>/dev/null || true
    
    # Source ratos-logging.sh directly
    if source "$BASE_DIR/configuration/scripts/ratos-logging.sh" 2>/dev/null; then
        test_log_pass "ratos-logging.sh sourced successfully"
        
        local required_functions=(
            "log_info"
            "log_error"
            "log_warn"
            "log_debug"
            "execute_with_logging"
            "setup_error_trap"
            "log_script_start"
            "log_script_complete"
        )
        
        for func in "${required_functions[@]}"; do
            if declare -f "$func" >/dev/null 2>&1; then
                test_log_pass "Function $func is available"
            else
                test_log_fail "Function $func is not available"
            fi
        done
        
    else
        test_log_fail "Failed to source ratos-logging.sh"
    fi
}

# Test 5: Test execute_with_logging integration
test_execute_with_logging_integration() {
    test_log_section "Testing execute_with_logging integration"
    
    # Clear log file
    true > "$TEST_LOG_FILE"
    
    # Source logging
    source "$BASE_DIR/configuration/scripts/ratos-logging.sh" 2>/dev/null
    
    # Test execute_with_logging with a simple command
    if execute_with_logging "test_context" "TEST_ERROR" echo "Integration test" >/dev/null 2>&1; then
        test_log_pass "execute_with_logging executed successfully"
        
        # Check if it was logged
        if grep -q "Integration test" "$TEST_LOG_FILE"; then
            test_log_pass "execute_with_logging output was logged"
        else
            test_log_fail "execute_with_logging output was not logged"
        fi
        
        if grep -q "Command completed successfully" "$TEST_LOG_FILE"; then
            test_log_pass "execute_with_logging success was logged"
        else
            test_log_fail "execute_with_logging success was not logged"
        fi
        
    else
        test_log_fail "execute_with_logging failed to execute"
    fi
}

# Run all tests
main() {
    test_logging_function_availability
    test_ratos_common_logging
    test_src_common_logging
    test_script_syntax
    test_execute_with_logging_integration
    
    # Print summary
    test_log_section "Test Results Summary"
    echo -e "Tests passed: ${GREEN}$TESTS_PASSED${NC}"
    echo -e "Tests failed: ${RED}$TESTS_FAILED${NC}"
    
    if [[ $TESTS_FAILED -gt 0 ]]; then
        echo -e "\n${RED}Failed tests:${NC}"
        for test in "${FAILED_TESTS[@]}"; do
            echo -e "  ${RED}✗${NC} $test"
        done
        
        # Cleanup
        rm -f "$TEST_LOG_FILE"
        exit 1
    else
        echo -e "\n${GREEN}All tests passed! Logging integration is working correctly.${NC}"
        
        # Cleanup
        rm -f "$TEST_LOG_FILE"
        exit 0
    fi
}

# Run tests
main "$@"
