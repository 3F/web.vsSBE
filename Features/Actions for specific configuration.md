# Actions for specific configuration 

## For v0.9+ 

You can use an additional option "Actions for specific configurations" (see below) or conditional statements with [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts) core.

* Turn on support: [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts) & [MSBuild](../Scripts_&_Commands/MSBuild) in control window. 
* And use for example: 

```
#!java

#[($(Configuration) == Debug){ 
    ... 
}]
```
also you can check only part of the name, e.g.:
```
#!java

#[($(Configuration) ~= _with_revision) 
{ 
    All configuration with names:  
     * Debug_with_revision,  
     * Release_with_revision, etc. 
}]
```
etc. *see [ConditionComponent](../Scripts_&_Commands/SBE-Scripts/Components/ConditionComponent) for more details*

## For v0.8+ 

*Actions for specific configurations has been introduced in* **v0.8**

Simply:

* Select the event type, mode, add the any actions, and configure other available options.
* In window "Only For" you can select available configuration for your solution.
* Activate event and click [apply]. 

As result: this should work only for selected configurations.

## For version < v0.8 or for all

You can use simple call, for example:

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

and similar with [MSBuild](../Scripts_&_Commands/MSBuild)

# References

* [MSBuild](../Scripts_&_Commands/MSBuild)
* [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts)
* * [ConditionComponent](../Scripts_&_Commands/SBE-Scripts/Components/ConditionComponent)
* [Examples & Features](../Examples)