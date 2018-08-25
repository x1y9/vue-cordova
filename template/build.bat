@setlocal enableDelayedExpansion
@if  "%1"=="" goto do_help

@if  "%1"=="prepare" goto do_prepare
@if  "%1"=="debug" goto do_debug
@if  "%1"=="release" goto do_release

@if  "%1"=="version" goto do_npm
@if  "%1"=="dev" goto do_npm
@if  "%1"=="build" goto do_npm
@if  "%1"=="clean" goto do_npm


:do_help
@echo.
@echo build script for cordova-vue project
@echo usage: build [prepare^|dev^|build^|debug^|release^|version^|clean]
@echo.
@echo For destkop: using dev and build
@echo For android: using debug, release
@goto end

:do_prepare
@REM 准备构建需要的库
call yarn
@IF %ERRORLEVEL% NEQ 0 goto error_end
call npm run init
@REM 删除巨大的spalsh文件，不能删目录，因为有些插件需要把资源写入drawable
@for /d %%a in ("cordova\platforms\android\res\drawable*") do del "%%~a\screen.png" > nul 2>&1
@goto end

:do_debug
call npm run cordova android
echo if dev server not running, using `start build dev` to start it.
@goto end

:do_release
call npm run android %2
@IF %ERRORLEVEL% NEQ 0 goto error_end
@goto end

:do_npm
call npm run %1 %2
@IF %ERRORLEVEL% NEQ 0 goto error_end
@goto end

:error_end
@echo Oops... Something wrong!
@ver /ERROR >NUL 2>&1

:end