@echo off
@echo Atomic OS Builder Utility for Windows

@cd bin
@call build.bat
@cd ..

@cd hx
@call build.bat
@cd ..

@echo - merging dependencies and wash commands into system
@type vendor\zepto.min.js zepto.eof.txt vendor\ejohn-class.js system.js bin\atomos-bin.js hx\atomos-hx.js > atomos.t.js 2>NUL

@echo - adding main
@type atomos.t.js main.js > atomos.js 2>NUL

@echo - skipping minification
