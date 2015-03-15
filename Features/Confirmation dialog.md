# Confirmation dialog / Prompt window

In latest versions you can use special option for your [scripts](../scripts). 

![Confirmation dialog](https://bytebucket.org/3F/vssolutionbuildevent/wiki/Resources/dlg/confirmation.png)

* Simply add any action type for any events
* In `Control` section set the **Confirmation** option.


This can be useful for most operations. However you can also use own dialogs, see below.


## Custom dialogs

You can use any own dialog if needed, for example:

* Activate [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts) support
* Use script for example:

```
#!java


#[(#[File sout("cscript", "//nologo dialog.vbs")]) {

    ... your action if 'Yes'

}]
```

* Where dialog.vbs it's a simple [vbscript](http://ss64.com/vb/) with [msgbox](http://ss64.com/vb/msgbox.html), for example:

```
#!basic

' Sample of dialog
ret = MsgBox("... information ...",  vbAbortRetryIgnore + vbDefaultButton3 + vbExclamation , "Custom dialog")

' this result we should set to our script above, for example:
If ret = vbYes Then
    Wscript.Echo "true"
Else
    Wscript.Echo "false"
End If
```
![Custom dialog](https://bytebucket.org/3F/vssolutionbuildevent/wiki/Resources/dlg/msgbox_vbs.png)

similarly, you can also use any other script language..

**Note:** Should be enabled the [ConditionComponent](../Scripts_&_Commands/SBE-Scripts/Components/ConditionComponent) for [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts) core.
