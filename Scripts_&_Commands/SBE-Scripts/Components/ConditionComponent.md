# ConditionComponent #

Conditional statement for scripts.

## Syntax ##

```
#!java

#[(condition){ 
  body if the condition has true value
}
else{ 
  body if the condition has false value
}]
```

```
#!java

#[(condition){ body if condition has true value }]
```


## Available operators ##

```
#!text

 ===, !==, ~=, ==, !=, >=, <=, !, >, < 
```
**v0.11.3+**:
```
#!text

 ^=, =^
```
Rules of comparison:

* **===** 
*  * Compares as: left == right as string
* **!==**
* * Compares as: left != right as string
* **~=**
* * Compares as: left Contains right ?
* **^=**
* * Compares as: left Begins with right ?
* **=^**
* * Compares as: left Ends with right ?
* **==** 
* * Compares in order of: 
* * * left == right as numeric
* * * left == right as boolean
* * * left == right as string
* **!=** 
* * Compares in order of: 
* * * left != right as numeric
* * * left != right as boolean
* * * left != right as string
* **>**
* * Compares as: left > right as numeric
* **>=**
* * Compares as: left >= right as numeric
* **<**
* * Compares as: left < right as numeric
* **<=**
* * Compares as: left <= right as numeric
* **!**
* * Inverts result of the expression in the used brackets

## Composite Conditions ##

Composite Conditions **available with v0.11** with limited Short-circuit Evaluation (separately for all brackets)

### && and || ###

```
#!java

#[($(Configuration) ~= Deb && $(count) > 10 || $(Configuration) == "Release" ){
    ...
}]
```

```
#!java

#[( #[var count] > 10 || ($(isAllow) && !false ) ){
    ...
}
else{
    ...
}]
```

```
#!java

#[( (1 < 2 && 2 == 2 && ( true || ((false || 2 >= 2) && (1 > 7 && true)))) ){
    ...
}]
```


## Examples ##

```
#!java

#[($(Configuration) ~= Deb){
    #[var ver = #[var ver].#[var revBuild]]
}]
```

```
#!java

#[(#[Build projects.find("ZenLib").IsBuildable]){
    #[var branchSha1 = #[File sout("git", "rev-parse --short HEAD")]]
}]
```

```
#!java

#[(!1 > 2){
    is greater
}]
```

### Comparing strings. Case insensitive.

You can use the [MSBuild](../../MSBuild) core and [String.ToLower](https://msdn.microsoft.com/en-us/library/system.string.tolower.aspx) Method for your variables, for example:

```
#!java

#[( $(left.ToLower()) ^= $(right.ToLower()) ) {
    Yes
}
else{
    No
}]
```
