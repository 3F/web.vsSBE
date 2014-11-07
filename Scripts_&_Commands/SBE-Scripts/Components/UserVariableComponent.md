# UserVariableComponent #

For work with User-Variables

Syntax:
```
#!java

#[var name]
```

```
#!java

#[var name = mixed value]
```

Sample:
```
#!java

#[var branchSha1 = #[File sout("git", "rev-parse --short HEAD")]]
```
```
#!java

#[var ver = #[var ver].#[var revBuild]]
```
