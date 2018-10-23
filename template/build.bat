@setlocal enableDelayedExpansion
@if  "%1"=="" goto do_help

@if  "%1"=="prepare" goto do_prepare
@if  "%1"=="debug" goto do_debug
@if  "%1"=="release" goto do_release
@if  "%1"=="publish" goto do_publish
@if  "%1"=="picture" goto do_picture

@if  "%1"=="version" goto do_npm
@if  "%1"=="dev" goto do_npm
@if  "%1"=="build" goto do_npm
@if  "%1"=="clean" goto do_npm


:do_help
@echo.
@echo build script for cordova-vue project
@echo usage: build [prepare^|dev^|build^|debug^|release^|publish^|version^|clean^|picture]
@echo.
@echo For destkop: build [dev^|build] [theme]
@echo For android: build [prepare^|debug^|release^|publish] [theme]
@goto end

:do_prepare
@REM 准备构建需要的库
call yarn
@IF %ERRORLEVEL% NEQ 0 goto error_end
call npm run init
@REM 删除巨大的spalsh文件，不能删目录，因为有些插件需要把资源写入drawable，兼容cordova-andoid 6.3,6.4,7.0
@for /d %%a in ("cordova\platforms\android\res\drawable*") do del "%%~a\screen.png" > nul 2>&1
@for /d %%a in ("cordova\platforms\android\app\src\main\res\drawable*") do del "%%~a\screen.png" > nul 2>&1
@goto end

:do_debug
call npm run debug android %2
echo if dev server not running, using `start build dev` to start it.
@goto end

:do_release
call npm run build android %2
@IF %ERRORLEVEL% NEQ 0 goto error_end
@goto end

:do_publish
call npm run publish android %2
@IF %ERRORLEVEL% NEQ 0 goto error_end
@goto end

:do_npm
call npm run %1 %2
@IF %ERRORLEVEL% NEQ 0 goto error_end
@goto end

:do_picture
convert src\assets\icon.png -resize 512x publish\icon512.png
convert src\assets\icon.png -resize 114x publish\icon114.png
convert -size 1024x500  radial-gradient:#8c8ca4-#232050 ~bg.png
convert src\assets\icon.png -background none -pointsize 36 -size 480x -fill "#e7e7e7" -gravity center caption:"App slogan" -append ~slogan.png
composite -gravity center ~slogan.png ~bg.png publish\feature.jpg
del ~bg.png ~slogan.png
@goto end

:error_end
@echo Oops... Something wrong!
@ver /ERROR >NUL 2>&1

:end