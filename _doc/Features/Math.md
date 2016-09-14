---
layout: doc
title: Math operations
permalink: /doc/Features/Math/
---
# Math operations

*Should be enabled the [MSBuild](../../Scripts/MSBuild/) support at least.*

In examples below, we use the [MSBuild Property Functions](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_PropertyFunctions) and you can use any static method or property of these system classes:

* [System.Math](https://msdn.microsoft.com/en-us/library/system.math_methods%28v=vs.100%29.aspx)
    * Other available arithmetic methods [here](https://msdn.microsoft.com/en-us/library/dd633440.aspx?f=255&MSPPError=-2147217396#BKMK_PropertyFunctions)
* [System.Decimal](https://msdn.microsoft.com/en-us/library/system.decimal_methods%28v=vs.100%29.aspx)
* [System.Double](https://msdn.microsoft.com/en-us/library/system.double_methods%28v=vs.100%29.aspx)
* [System.UInt16](https://msdn.microsoft.com/en-us/library/system.uint16_methods%28v=vs.100%29.aspx)
* [System.UInt32](https://msdn.microsoft.com/en-us/library/system.uint32_methods%28v=vs.100%29.aspx)
* [System.UInt64](https://msdn.microsoft.com/en-us/library/system.uint64_methods%28v=vs.100%29.aspx)
* [System.Int16](https://msdn.microsoft.com/en-us/library/system.int16_methods%28v=vs.100%29.aspx)
* [System.Int32](https://msdn.microsoft.com/en-us/library/system.int32_methods%28v=vs.100%29.aspx)
* [System.Int64](https://msdn.microsoft.com/en-us/library/system.int64_methods%28v=vs.100%29.aspx)
* [System.TimeSpan](https://msdn.microsoft.com/en-us/library/system.timespan_methods%28v=vs.100%29.aspx)
* [System.DateTime](https://msdn.microsoft.com/en-us/library/system.datetime_methods%28v=vs.100%29.aspx)
* [...](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_Static)

## Remarks

### Numbers in scientific (exponential) notation

**To convert from** you can use the [Double.Parse()](https://msdn.microsoft.com/en-us/library/system.double.parse.aspx) and similar methods:

```{{site.msblang}}
$([System.Double]::Parse('1,19E+7'))
$([System.Double]::Parse('1.19E+7')) - Fail: The expression "[System.Double]::Parse(1.19E+7)" cannot be evaluated. Input string was not in a correct format.
```

To avoid error above (for your selected culture) use for example:

```{{site.msblang}}
$([System.Double]::Parse('1.19E+7', '$([System.Globalization.CultureInfo]::GetCultureInfo("en-US"))'))
$([System.Double]::Parse('1.19E+7', '$([System.Globalization.CultureInfo]::CurrentUICulture)'))
$([System.Double]::Parse('1.19E+7', '$([System.Globalization.CultureInfo]::CurrentUICulture.NumberFormat)'))
$([System.Double]::Parse('1.19E+7', $$([System.Globalization.CultureInfo]::CurrentUICulture)))
...
```

### Difference between quotes. Exponential notation problem.

All data inside double quotes `".."` will be evaluated manually (standard move upward from deepest).
All data inside single quotes `'..'` is not processed and will be entirely sent into engine for single final evaluation.

What it means, for example:

```{{site.msblang}}
    $([MSBuild]::Multiply("$([System.Math]::Log(2))", 16)) -> 1,10903548889591E+16
    \                     \_(1) 0,693147180559945_/
    \_______________(2)__________________________________/


    $([MSBuild]::Multiply('$([System.Math]::Log(2))', 16)) -> 11,0903548889591
    \______________________(1)___________________________/

$([System.Math]::Exp(1.10903548889591E+16)) = ∞ 
$([System.Math]::Exp(11.0903548889591)) = 65535,9999999983
```

Other samples:

Expression                                                                    | Evaluated value
------------------------------------------------------------------------------|------
$([System.Math]::Log(2))                                                      | 0,693147180559945
$([MSBuild]::Multiply('$([System.Math]::Log(2))', 16))                        | 11,0903548889591
$([System.Math]::Exp('$([MSBuild]::Multiply($([System.Math]::Log(2)), 16))')) | 65536

## Popular methods

{% include elem/fillme %}

### Add()

```{{site.msblang}}
$(number = $([MSBuild]::Add(1024, 12)))
$(number = $([MSBuild]::Add($(number), 1)))
```

{% assign infoData = "v0.12.8+ [Contains syntactic sugar](../../Scripts/MSBuild/#syntactic-sugar) `+=` for this important operation, e.g.: `$(i += 1)`" %}
{% include elem/info %}

### Subtract()

```{{site.msblang}}
$(number = $([MSBuild]::Subtract(1024, 12)))
$(number = $([MSBuild]::Subtract($(number), 1)))
```

{% assign infoData = "v0.12.8+ [Contains syntactic sugar](../../Scripts/MSBuild/#syntactic-sugar) `-=` for this important operation, e.g.: `$(i -= 1)`" %}
{% include elem/info %}

### Bit mask

**Set**

```{{site.msblang}}
$(mask = 0)

$(mask = $([MSBuild]::BitwiseOr($(mask), 1)))
$(mask = $([MSBuild]::BitwiseOr($(mask), 4)))
$(mask = $([MSBuild]::BitwiseOr($(mask), 8)))

$(maskString = $([System.Convert]::ToString('$([System.Convert]::ToInt32($(mask)))', 2)))
```

Result: `1101`

**Check**

```{{site.sbelang}}
#[$(v = 2)]

#[( $([MSBuild]::BitwiseAnd($(mask), $(v))) != 0 ){ 
    "$(v)" is defined in the mask($(maskString)) 
}
else{ 
    "$(v)" is not defined in the mask($(maskString))
}]
```

`"2" is not defined in the mask(1101)`

# References

* [MSBuild](../../Scripts/MSBuild/)
* [SBE-Scripts](../../Scripts/SBE-Scripts/)
* [Examples & Features](../../Examples/)

