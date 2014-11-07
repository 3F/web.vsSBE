# OWPComponent #

For work with OWP (Output Window Pane)

## out ##

For getting mixed data

Syntax:
```
#!java

#[OWP out("name of item")]
```
Sample:
```
#!java

#[OWP out("Build")]
```
Note: The "Build" item used by default.

Syntax with item by default:
```
#!java

#[OWP out]
```

### The Build item ###

* Partial raw from all build log:
```
#!java

#[OWP out.All]
```
```
#!java

#[OWP out]
```

* Partial raw with warning/s:
```
#!java

#[OWP out.Warnings.Raw]
```
```
#!java

#[OWP out.Warnings]
```

*  Count of warnings:
```
#!java

#[OWP out.Warnings.Count]
```

* List of warnings as C4702,4505 ... :
```
#!java

#[OWP out.Warnings.Codes]
```

* Partial raw with error/s:
```
#!java

#[OWP out.Errors.Raw]
```
```
#!java

#[OWP out.Errors]
```

* Count of errors:
```
#!java

#[OWP out.Errors.Count]
```

* List of errors as C4702,C4505 ... :
```
#!java

#[OWP out.Errors.Codes]
```


