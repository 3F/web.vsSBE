# UserVariableComponent #

Works with User-Variables

Syntax:
```
#!java

#[var name]
```

```
#!java

#[var name = mixed value]
```

Samples:
```
#!java

#[var branchSha1 = #[File sout("git", "rev-parse --short HEAD")]]
```
```
#!java

#[var ver = #[var ver].#[var revBuild]]
```

# Operations

**v0.11.3+**

## Unset variable.

Operator the '**-**'(minus). Use this as first symbol for variable name that must be removed:

```
#!java

#[var -name]
```

## Default value for variable.

You can use this for re/definition variable with default value for compatibility with variables from [MSBuild](../../MSBuild) core.

Operator the '**+**'(plus). Use this as first symbol for variable name that must be re/defined by default:
```
#!java

#[var +name]
```


# Examples

## Empty string

Allowed in **v0.11.3+**
```
#!java

#[var name =]
```

For older versions - you should use 1 or more symbols (whitespace characters or any other value), for example:
```
#!java

#[var name = ]
```
** you can trim this if needed later with [MSBuild](../../MSBuild)*

## Whitespace characters for values

The all variables should skip the first whitespace characters to set values for compatibility. However, you can use the [MSBuild](../../MSBuild) core and static methods, for example:

* [String.Concat Method (Object)](https://msdn.microsoft.com/en-us/library/khca9w90%28v=vs.100%29.aspx)
* * [String.Concat Method (String, String)](https://msdn.microsoft.com/en-us/library/a6d350wd%28v=vs.100%29.aspx)
* [String.Format Method (String, Object, Object)](https://msdn.microsoft.com/en-us/library/zf3d0ccc%28v=vs.100%29.aspx)
* etc.

Example - only 5 whitespace character as value:
```
#!java

#[var name = $([System.String]::Concat("     "))]
```

Others:
```
#!java

#[var name = $([System.String]::Concat("  ")) mixed value]
#[var name = $([System.String]::Format("{0} - {1}", "      ", "test"))]
```

You can to escape evaluation of this sequence with a '$' symbols if needed. For more details see in [MSBuild](../../MSBuild)
