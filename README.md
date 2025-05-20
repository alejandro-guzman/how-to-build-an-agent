# Claude Agent CLI

A command-line interface that leverages Anthropic's Claude API to create an interactive agent with filesystem capabilities. This project implements a lightweight CLI agent that can access and manipulate files on your system through natural language instructions.

## Features

The agent provides three core capabilities:
- **Read Files**: View the contents of text files
- **List Files**: See files and directories in a given path
- **Edit Files**: Make changes to text files by replacing content

## Prerequisites

- Go 1.24 or later
- An Anthropic API key

## Setup

1. Generate an Anthropic API key at: https://console.anthropic.com/settings/keys
2. Set your API key as an environment variable:
   ```
   export ANTHROPIC_API_KEY=your_api_key_here
   ```

## Running the Agent

Simply execute:

```bash
go run ./...
```

This will start an interactive session where you can chat with Claude and ask it to interact with your filesystem.

## Code Structure

- `main.go`: Core agent implementation that handles communication with Claude and tool execution
- `read_file.go`: Implements file reading capability
- `list_files.go`: Implements directory listing capability
- `edit_file.go`: Implements file editing functionality

## Example Usage

Once the agent is running, you can interact with it through natural language:
- "List all files in the current directory"
- "Show me the contents of README.md"
- "Create a new file called example.txt with 'Hello World' as its content"

## Credits

This project follows the tutorial at: https://ampcode.com/how-to-build-an-agent