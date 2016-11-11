---
layout: doc
title: Advanced work with Git submodules
permalink: /doc/Examples/Git/Submodules/
---
## Advanced work with Git submodules

### Restore all git submodules when opening Visual Studio IDE 

Before v0.12.8 you have [this way]({{site.docp}}/Examples/ReloadProjects/). But now it can be much more easier.

* Add Action for [Sln-Opened]({{site.docp}}/Events/SlnOpened/) event.
* Set Context: `Before`
* Select [Script Mode]({{site.docp}}/Modes/Script/)

Then add simple script:

```{{site.sbelang}}
#[$(moduleConari = "Conari/Conari.sln")]

#[( #[File exists.file("$(moduleConari)")] )
{ 
    #[File scall("submodules.bat", "$(moduleConari)", 400)]
}
else{
    #[File call("submodules.bat", "$(moduleConari)", 2000)]
}]
```

Create in solution directory `submodules.cmd`:

```bash
@echo off

echo. checking submodules ...

if not exist "%1" goto restore
REM ...

goto exit

:restore

echo.
echo. We detected that you need to update git submodules.
echo. We already do it automatically. Solution of VS IDE is also should be updated after ending of this process by the action via `Sln-Opened` event. If not, please reopen .sln file again.
echo.
echo. Please wait...
echo.

git submodule update --init --recursive 2>nul || goto err_gitNotFound

goto exit

:err_gitNotFound

echo.  1>&2
echo. `git` was not found or something went wrong. Check your connection and env. variable `PATH`. Or get submodules manually: 1>&2
echo.     1. Use command `git submodule update --init --recursive` 1>&2
echo.     2. Or clone initially with recursive option: `git clone --recursive ...` 1>&2
echo.  1>&2

:exit
```

Activate action and click [Apply]

Now when user will clone your repository without `--recursive` or in some other case when submodule does not exists in solution directory:

* Before first loading solution (after click on **.sln**) will be a black window with automatic restoring submodules.
    * 'black window' can be hidden, but it can take a long time for restoring all packages. For this case the best way to show some information.
* And no any windows (info) when all submodules has been restored.

**To support msbuild.exe**, just call `call submodules "Conari/Conari.sln" || goto err` before build, like this:

```bash
@echo off

set msbuild=tools/msbuild

call submodules "Conari/Conari.sln" || goto err

call %msbuild% gnt.core /p:ngconfig="packages.config" /nologo /v:m /m:4
call %msbuild% "LunaRoad.sln" /verbosity:normal /l:"packages\vsSBE.CI.MSBuild\bin\CI.MSBuild.dll" /m:4 /t:Rebuild /p:Configuration=Release

goto exit

:err

echo. Build failed. 1>&2

:exit
```

For more about support CI, [read here]({{site.docp}}/CI/)


## References

* [MSBuild]({{site.docp}}/Scripts/MSBuild/)
* [C# Mode]({{site.docp}}/Modes/CSharp/)
    * [Processing modes]({{site.docp}}/Modes/)
* [Sln-Opened]({{site.docp}}/Events/SlnOpened/#context)
    * [Events]({{site.docp}}/Events/)
* [Examples & Features]({{site.docp}}/Examples/)