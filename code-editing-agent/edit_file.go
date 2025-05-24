// Package main implements file editing functionality.
package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path"
	"strings"
)

// EditFileDefinition defines the edit_file tool which can modify text files
// by replacing one string with another or create new files.
var EditFileDefinition = ToolDefinition{
	Name: "edit_file",
	Description: `Make edits to a text file.
	
Replaces 'old_str' with 'new_str' in the given file. 'old_str' and 'new_str' MUST be different from each other.

If the file specified with path does not exists, it will be created.`,
	InputSchema: EditFileInputSchema,
	Function:    EditFile,
}

// EditFileInput defines the parameters needed for the edit_file operation.
type EditFileInput struct {
	Path   string `json:"path" jsonschema_description:"The path of the file to edit"`
	OldStr string `json:"old_str" jsonschema_description:"Text to search for - must match exactly and must only have on match exactly."`
	NewStr string `json:"new_str" jsonschema_description:"Text to replace old_str with."`
}

// EditFileInputSchema is the JSON schema for the edit_file tool's input parameters.
var EditFileInputSchema = GenerateSchema[EditFileInput]()

// EditFile replaces all occurrences of a given string in a file with a new string.
// If the file doesn't exist and old_str is empty, it creates a new file with new_str as content.
func EditFile(input json.RawMessage) (string, error) {
	editFileInput := EditFileInput{}
	err := json.Unmarshal(input, &editFileInput)
	if err != nil {
		return "", err
	}
	if editFileInput.Path == "" || editFileInput.OldStr == editFileInput.NewStr {
		return "", fmt.Errorf("invalid input parameters")
	}

	content, err := os.ReadFile(editFileInput.Path)
	if err != nil {
		if os.IsNotExist(err) && editFileInput.OldStr == "" {
			return createNewFile(editFileInput.Path, editFileInput.NewStr)
		}
	}

	oldContent := string(content)
	newContent := strings.Replace(oldContent, editFileInput.OldStr, editFileInput.NewStr, -1)
	if oldContent == newContent && editFileInput.OldStr != "" {
		return "", fmt.Errorf("old_str not found in file")
	}

	err = os.WriteFile(editFileInput.Path, []byte(newContent), 0644)
	if err != nil {
		return "", err
	}
	return "ok", nil
}

// createNewFile creates a new file with the given content.
// It creates any necessary directories in the file path.
func createNewFile(filePath, content string) (string, error) {
	dir := path.Dir(filePath)
	if dir != "." {
		err := os.MkdirAll(dir, 0755)
		if err != nil {
			return "", fmt.Errorf("failed to create directory: %w", err)
		}
	}

	err := os.WriteFile(filePath, []byte(content), 0644)
	if err != nil {
		return "", fmt.Errorf("failed to create file: %w", err)
	}

	return fmt.Sprintf("Successfully create file %s", filePath), nil
}
