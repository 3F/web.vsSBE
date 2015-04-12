# Operations with strings

*Should be enabled the [MSBuild](../Scripts_&_Commands/MSBuild) support at least.*

In examples below, we use the [MSBuild Property Functions](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_PropertyFunctions) and you can use any static method or property of these system classes:

* [System.String](https://msdn.microsoft.com/en-us/library/system.string_methods%28v=vs.100%29.aspx)
* [System.StringComparer](https://msdn.microsoft.com/en-us/library/system.stringcomparer_methods%28v=vs.100%29.aspx)
* [System.Char](https://msdn.microsoft.com/en-us/library/system.char_methods%28v=vs.100%29.aspx)
* [System.Convert](https://msdn.microsoft.com/en-us/library/system.convert_methods%28v=vs.100%29.aspx)
* [System.Enum](https://msdn.microsoft.com/en-us/library/system.enum_methods%28v=vs.100%29.aspx)
* [...](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_Static)


## Remove newline characters and others problematic symbols.

Some your results may contain a some problematic characters for different functions. In most cases this applies to [MSBuild Property Functions](../Scripts_&_Commands/MSBuild).

You can use [System.String](https://msdn.microsoft.com/en-us/library/system.string_methods%28v=vs.100%29.aspx) static methods if you can't manually change your data.

For example:

```
#!java

$(cs.Replace("\r\n", ""))
```

or with different combination CR/LF ([Newline - representations](http://en.wikipedia.org/wiki/Newline#Representations))

```
#!java

$(cs.Replace("\r", "").Replace("\n", ""))
```


So, if you have a multiline value in your variable **projectRev**:

```
#!java

#[var cs = Version is a %ver% !] 

#[var projectRev = v1.2
debug 
rev321]
```

you can use the Replace() method for changing on any compatible sequence, e.g.:

```
#!java


#[var projectRev = $(projectRev.Replace("\r\n", " :: "))]
#[var cs = $(cs.Replace("%ver%", "#[var projectRev]"))]
```

or as variant:

```
#!java

#[var cs = $(cs.Replace("%ver%", $(projectRev.Replace("\r\n", " :: "))))]
```
and similar...

note:

* use the escaping \\\r \\\n if need this
* use the \x00 - \xFF for other char by code


as result we have:

```
#!java

Version is a v1.2 :: debug  :: rev321 !
```

## Convenience for single line arguments

If you want to pass a long string as argument for some function or method, for example as [here](../Examples/Artefacts):

```
#!java

#[File sout("cmd", "/C cd \"#[var pDir]bin/#[var cfg]/\" & xcopy *.dll \"#[var nupCIMdir]\bin\" /Y/R/I & xcopy NLog.dll.nlog \"#[var nupCIMdir]\bin\" /Y/R/I")]
```

You can for example:

* Use the User-Variables for splitting the logic:
* * With [MSBuild](../Scripts_&_Commands/MSBuild) core
* * With [UserVariableComponent](../Scripts_&_Commands/SBE-Scripts/Components/UserVariableComponent) ([SBE-Scripts](../Scripts_&_Commands/SBE-Scripts) core)

The [UserVariableComponent](../Scripts_&_Commands/SBE-Scripts/Components/UserVariableComponent) is  more useful because for current component allowed the multiline mixed definition and therefore you can for example:

```
#!java

#[var arg = cd \"D:/tmp/\" 
dir
cd ..
dir]

#[var arg = $(arg.Replace("\r\n", " & "))]
```
Evaluated value for **arg** variable above should be as `cd \"D:/tmp/\"  & dir & cd .. & dir`

You can also automatically escape the '"' (double quotes), erase the first & last the newline symbols etc.:

```
#!java

#[var arg = 
cd "D:/tmp/" 
dir
cd ..
dir
]
$(arg.Trim("\r\n").Replace('"', '\"').Replace("\r\n", " & "))
```

Therefore the long single line from example above also can be as:
```
#!java

#[var arg = 

cd \"#[var pDir]bin/#[var cfg]/\"
xcopy *.dll \"#[var nupCIMdir]\bin\" /Y/R/I
xcopy NLog.dll.nlog \"#[var nupCIMdir]\bin\" /Y/R/I

]

#[var arg = $(arg.Trim("\r\n").Replace("\r\n", " & "))]
#[File sout("cmd", "/C  #[var arg]")]
```

also with [cmd](../Scripts_&_Commands/SBE-Scripts/Components/FileComponent) alias it can be as:

```
#!java

#[var arg = 

cd "#[var pDir]bin/#[var cfg]/"
xcopy *.dll "#[var nupCIMdir]\bin" /Y/R/I
xcopy NLog.dll.nlog "#[var nupCIMdir]\bin" /Y/R/I

]

#[var arg = $(arg.Trim("\r\n").Replace('"', '\"').Replace("\r\n", " & "))]
#[File cmd("#[var arg]")]
```
and similar..


# References

* [MSBuild](../Scripts_&_Commands/MSBuild)
* [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts)
* [Examples & Features](../Examples)
