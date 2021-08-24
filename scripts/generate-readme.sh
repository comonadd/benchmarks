#!/bin/bash

tests=("js-immutability.js")

echo "Benchmarks"
echo "=========="
echo ""

for t in "${tests[@]}"
do
    echo "## [$t](./$t)"
    echo "| Test        | Time        |"
    echo "| ----------- | ----------- |"
    while read p; do
        echo "$p"
    done < <(node "./$t" -g)
done
