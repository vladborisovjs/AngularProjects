@echo off
Set SRCFOLDER=%CD%\conf_stend_telda
Set CuksFolder=%CD%\..\cuks\
Set AdminFolder=%CD%\..\admin\
Set PchFolder=%CD%\..\pch\
Set Wall=%CD%\..\wall\
Set Head=%CD%\..\head\
Set Stat=%CD%\..\stat\

If Exist "%CuksFolder%\*.*" (
	ROBOCOPY %SRCFOLDER% %CuksFolder% /S /NFL /NDL
) Else (
   Echo NO CUKS FOLDER
)
If Exist "%AdminFolder%\*.*" (
	ROBOCOPY %SRCFOLDER% %AdminFolder% /S /NFL /NDL
) Else (
   Echo NO ADMIN FOLDER
)
If Exist "%PchFolder%\*.*" (
	ROBOCOPY %SRCFOLDER% %PchFolder% /S /NFL /NDL
) Else (
   Echo NO PCH FOLDER
)
If Exist "%Wall%\*.*" (
	ROBOCOPY %SRCFOLDER% %Wall% /S /NFL /NDL
) Else (
   Echo NO Wall FOLDER
)
If Exist "%Head%\*.*" (
	ROBOCOPY %SRCFOLDER% %Head% /S /NFL /NDL
) Else (
   Echo NO Head FOLDER
)
If Exist "%Stat%\*.*" (
	ROBOCOPY %SRCFOLDER% %Stat% /S /NFL /NDL
) Else (
   Echo NO Stat FOLDER
)
pause