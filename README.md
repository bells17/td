# tdf

[![npm version](https://badge.fury.io/js/tdf.svg)](https://badge.fury.io/js/tdf) [![Build Status](https://travis-ci.org/bells17/tdf.svg?branch=master)](https://travis-ci.org/bells17/tdf)

Transform data format cli.

### usage

```
$ npm install -g tdf
$ echo -e "aaa,bbb\n111,222" > sample.csv
$ tdf sample.csv
[{"aaa":"111","bbb":"222"}]
$ echo '[{"aaa":"111","bbb":"222"}]' > sample.json
$ tdf sample.json
aaa,bbb
111,222
```
