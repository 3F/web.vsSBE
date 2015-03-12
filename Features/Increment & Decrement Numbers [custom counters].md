# Increment & Decrement Numbers [custom counters]

*Should be enabled the [MSBuild](../Scripts_&_Commands/MSBuild) & [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts).*

In examples below, we use the [MSBuild Property Functions](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_PropertyFunctions) and you can use any static method or property of these system classes, for example:

* System.Math
* System.Decimal
* System.Double
* System.UInt16
* System.UInt32
* System.UInt64
* System.Int16
* System.Int32
* System.Int64
* System.TimeSpan
* System.DateTime
* [...](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_PropertyFunctions)

Example of counter in the range 1 - 10:

```
#!java

#[( $(counter) == "*Undefined*" ) {
    #[var counter = 0]
}]

    $(counter = $([MSBuild]::Add($(counter), 1)))

    #["
        The variable $(counter) should contain the number in the range 1 - 10
    "]

#[( $(counter) >= 10 ) {
    #[var counter = 0]
}]
```

Needed a more exotic control ? no problem:
```
#!java

#[($(numX) == "*Undefined*") {
    #[var numX    = 0]
    #[var numY    = 0]
    #[var numYmod = 0]
}]

$(numY    = $([MSBuild]::Add($(numY), 1)))
$(numYmod = $([MSBuild]::Modulo($(numY), 12)))

#[($(numYmod) == 0) {
    $(numX = $([MSBuild]::Add($(numX), 1)))
}]

#[var spec = $(numX).$(numYmod).$(numY)]
```

The variable **spec** in example above should contain the next values - ![Value of variable - spec](https://bytebucket.org/3F/vssolutionbuildevent/wiki/Resources/examples/var_spec.gif)


# References #

* [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts)
* [MSBuild](../Scripts_&_Commands/MSBuild)

