#!/usr/bin/env sh

rn_unit_tests() {
  echo "[+] Running React Native Tests"

  ( yarn test )

  if [ $? -eq 0 ]; then
    echo "[+] React Native Tests Complete"
  else
    echo "[-] React Native Tests Failed"
    exit 1
  fi
}

lint_checks() {
  echo "[+] Performing Lint and TS Checks"
  ( yarn lint:ts )

  if [ $? -eq 0 ]; then
    echo "[+] Lint and TS Checks Complete"
  else
    echo "[-] Lint and TS Checks Failed"
    exit 1
  fi
}
