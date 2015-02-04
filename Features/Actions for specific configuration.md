# Actions for specific configuration #

## For v0.9 or newer ##

You can use option "Actions for specific configurations" see below, or use conditions with SBE-Scripts & MSBuild core.

* Turn on support: SBE-Scripts & MSBuild in control window. 
* And use similar for your action script: 

```
#!java

#[($(Configuration) == Debug){ 
    ... 
}]
```
also you can check part of the name, e.g.:
```
#!java

#[($(Configuration) ~= _with_revision) 
{ 
    All configuration with names:  
     * Debug_with_revision,  
     * Release_with_revision, etc. 
}]
```

## For v0.8 or newer ##

*Actions for specific configurations introduced in* **v0.8**

* Simply select any event, mode, add the any action, and configure available options. 
* In window "Only For" you can select available configuration for your solution.
* Activate event and click [apply]. Now selected action should run only for selected configurations.

## For version < v0.8 or newer ##

Sample with the File Mode:

```
#!java

vssbe_h.bat PRE $(Configuration)
```

vssbe_h.bat:
```
#!bash

@echo off 
REM arguments: 
 
    REM event type: 
    set etype=%1 
    REM configuration name: 
    set cfgname=%2 
 
REM ### Event handling # 
 
goto :Event_%etype% 
 
REM ### Pre-Build 
 
    :Event_PRE 
        if "%cfgname%" == "Release" ( 
            ... TODO ... 
        ) 
    goto end 
 
REM ### Post-Build 
 
    :Event_POST 
    goto end 
 
REM ### Cancel-Build 
 
    :Event_CANCEL 
    goto end 
 
:end
```