#!/bin/bash

gray() {
  echo -e "\033[90m$1\033[0m"
}

green() {
  echo -e "\033[32m$1\033[0m"
}

divider="--------------------------------------------------"

print_header() {
  gray " $divider"
  green "  $1"
  gray " $divider"
}
