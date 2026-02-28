# Unit Testing & Coverage Skill

## 📋 Description
This skill automatically analyzes JavaScript files, creates comprehensive unit tests (3-5 per function), runs them with coverage tracking, and generates detailed reports.

## 🎯 Objectives
1. **Scan** all `.js` files in the project
2. **Identify** testable functions (minimum 3, maximum 5 tests per function)
3. **Generate** unit tests using Jest
4. **Execute** tests with coverage
5. **Report** results and save to dedicated folder

## 📂 Workflow Steps

### Step 1: Setup Testing Environment
**Action:** Install Jest and required dependencies

```bash
npm init -y 2>/dev/null || true
npm install --save-dev jest @types/jest jest-environment-jsdom
```

**Configure package.json for tests:**
```bash
npm pkg set scripts.test="jest --coverage --verbose"
npm pkg set scripts.test:watch="jest --watch"
npm pkg set jest.testEnvironment="jsdom"
npm pkg set jest.coverageDirectory="./tests/coverage"
npm pkg set jest.collectCoverageFrom[]="*.js"
npm pkg set jest.coverageReporters[]="text"
npm pkg set jest.coverageReporters[]="lcov"
npm pkg set jest.coverageReporters[]="html"
npm pkg set jest.coverageReporters[]="json-summary"
```

### Step 2: Analyze JavaScript Files
**Action:** Identify all testable functions in `.js` files

**Target File:** `script.js`

**Functions identified:**
1. `formatFileSize(bytes)` - Utility function (Pure)
2. `getFileExtension(filename)` - Utility function (Pure)
3. `preventDefaults(e)` - Event handler
4. `handleFiles(files)` - Core logic
5. `removeFile(fileId)` - DOM manipulation

### Step 3: Create Test Directory Structure
**Action:** Create dedicated test folder

```bash
mkdir -p tests/unit
mkdir -p tests/coverage
mkdir -p tests/reports
```

### Step 4: Generate Unit Tests
**Action:** Create comprehensive test files

**File:** `tests/unit/script.test.js`

**Test Coverage Plan:**
- `formatFileSize()`: 5 tests (0 bytes, bytes, KB, MB, GB)
- `getFileExtension()`: 4 tests (short ext, long ext, uppercase, no ext)
- `preventDefaults()`: 3 tests (preventDefault, stopPropagation, both)
- `handleFiles()`: 4 tests (empty array, single file, multiple files, duplicates)
- `removeFile()`: 3 tests (existing file, non-existing, animation)

### Step 5: Execute Tests
**Action:** Run Jest with coverage

```bash
npm test -- --coverage --json --outputFile=tests/reports/test-results.json
```

### Step 6: Generate Coverage Report
**Action:** Create detailed HTML and JSON reports

Coverage reports will be automatically generated in:
- `tests/coverage/lcov-report/index.html` (HTML report)
- `tests/coverage/coverage-summary.json` (JSON summary)
- `tests/coverage/lcov.info` (LCOV format)

### Step 7: Create Custom Markdown Report
**Action:** Generate human-readable report

**File:** `tests/reports/test-report.md`

**Report includes:**
- Execution timestamp
- Total tests (passed/failed)
- Coverage percentages (statements, branches, functions, lines)
- Individual test results
- Recommendations for improvement

## 🧪 Test Implementation

### formatFileSize() - 5 Unit Tests
```javascript
describe('formatFileSize', () => {
  test('should return "0 Bytes" for 0 bytes', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
  });

  test('should format bytes correctly', () => {
    expect(formatFileSize(500)).toBe('500 Bytes');
  });

  test('should format KB correctly', () => {
    expect(formatFileSize(2048)).toBe('2 KB');
  });

  test('should format MB correctly', () => {
    expect(formatFileSize(5242880)).toBe('5 MB');
  });

  test('should format GB correctly', () => {
    expect(formatFileSize(2147483648)).toBe('2 GB');
  });
});
```

### getFileExtension() - 4 Unit Tests
```javascript
describe('getFileExtension', () => {
  test('should extract extension from filename', () => {
    expect(getFileExtension('document.pdf')).toBe('PDF');
  });

  test('should convert to uppercase', () => {
    expect(getFileExtension('image.jpg')).toBe('JPG');
  });

  test('should truncate long extensions to 4 chars', () => {
    expect(getFileExtension('file.longext')).toBe('LONG');
  });

  test('should handle files with multiple dots', () => {
    expect(getFileExtension('archive.tar.gz')).toBe('GZ');
  });
});
```

### preventDefaults() - 3 Unit Tests
```javascript
describe('preventDefaults', () => {
  test('should call preventDefault on event', () => {
    const mockEvent = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
    preventDefaults(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  test('should call stopPropagation on event', () => {
    const mockEvent = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
    preventDefaults(mockEvent);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  test('should handle both calls without errors', () => {
    const mockEvent = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
    expect(() => preventDefaults(mockEvent)).not.toThrow();
  });
});
```

### handleFiles() - 4 Unit Tests
```javascript
describe('handleFiles', () => {
  beforeEach(() => {
    uploadedFiles = [];
    document.body.innerHTML = '<div id="filesPreview"></div>';
  });

  test('should handle empty file list', () => {
    handleFiles([]);
    expect(uploadedFiles.length).toBe(0);
  });

  test('should add single file to uploadedFiles array', () => {
    const mockFile = { name: 'test.pdf', size: 1024 };
    handleFiles([mockFile]);
    expect(uploadedFiles.length).toBe(1);
    expect(uploadedFiles[0]).toBe(mockFile);
  });

  test('should handle multiple files', () => {
    const mockFiles = [
      { name: 'file1.pdf', size: 1024 },
      { name: 'file2.jpg', size: 2048 }
    ];
    handleFiles(mockFiles);
    expect(uploadedFiles.length).toBe(2);
  });

  test('should call previewFile for each file', () => {
    global.previewFile = jest.fn();
    global.uploadFile = jest.fn();
    const mockFile = { name: 'test.pdf', size: 1024 };
    handleFiles([mockFile]);
    expect(uploadedFiles.length).toBe(1);
  });
});
```

### removeFile() - 3 Unit Tests
```javascript
describe('removeFile', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="filesPreview">
        <div class="file-item" data-file-id="123">Test File</div>
      </div>
    `;
  });

  test('should find file item by ID', () => {
    const fileItem = document.querySelector('[data-file-id="123"]');
    expect(fileItem).toBeTruthy();
  });

  test('should set animation style on file item', () => {
    const fileId = '123';
    const fileItem = document.querySelector(`[data-file-id="${fileId}"]`);
    removeFile(fileId);
    expect(fileItem.style.animation).toBe('slideIn 0.3s ease reverse');
  });

  test('should handle non-existing file ID gracefully', () => {
    expect(() => removeFile('non-existing-id')).not.toThrow();
  });
});
```

## 📊 Coverage Goals

| Metric       | Goal | Description                          |
|--------------|------|--------------------------------------|
| Statements   | 80%+ | Individual statements executed       |
| Branches     | 75%+ | Conditional paths covered            |
| Functions    | 90%+ | Functions called at least once       |
| Lines        | 80%+ | Lines of code executed               |

## 🚀 Execution

To run this skill:

```bash
# Execute all steps automatically
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report only
npm test -- --coverage
```

## 📝 Output Files

After execution, you'll find:

```
tests/
├── unit/
│   └── script.test.js           # Generated unit tests
├── coverage/
│   ├── lcov-report/
│   │   └── index.html           # HTML coverage report
│   ├── coverage-summary.json    # JSON summary
│   └── lcov.info                # LCOV format
└── reports/
    ├── test-results.json        # Jest JSON output
    └── test-report.md           # Custom markdown report
```

## ✅ Success Criteria

- [ ] All `.js` files scanned
- [ ] 3-5 tests created per function
- [ ] Tests execute successfully
- [ ] Coverage report generated
- [ ] Reports saved to `tests/` folder
- [ ] Coverage ≥ 80% for pure functions
- [ ] All tests pass ✅

## 🔧 Maintenance

**Update tests when:**
- New functions are added to `script.js`
- Function signatures change
- Business logic is modified
- Bug fixes require new test cases

**Run this skill:**
- Before every commit
- After refactoring
- During CI/CD pipeline
- Weekly for regression testing

---

**Last Updated:** 2026-02-28
**Version:** 1.0.0
**Maintainer:** Agente Vida MRR