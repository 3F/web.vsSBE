---
layout: doc
title: Test page for Wiki features
permalink: /doc/Wiki test/
---

`For internal testing of markdown engine`

# Highlighting

## Pygments style

{% highlight csharp %}
using ICommand = net.r_eg.vsSBE.Actions.ICommand;
using ISolutionEvent = net.r_eg.vsSBE.Events.ISolutionEvent;

namespace vsSolutionBuildEvent
{
    public class CSharpMode
    {
        public static int Init(ICommand cmd, ISolutionEvent evt)
        {
            return 0;
        }
    }
}
{% endhighlight %}

## GitHub Flavored Markdown

```csharp
using ICommand = net.r_eg.vsSBE.Actions.ICommand;
using ISolutionEvent = net.r_eg.vsSBE.Events.ISolutionEvent;

namespace vsSolutionBuildEvent
{
    public class CSharpMode
    {
        public static int Init(ICommand cmd, ISolutionEvent evt)
        {
            return 0;
        }
    }
}
```

## Bitbucket style

```
#!csharp
using ICommand = net.r_eg.vsSBE.Actions.ICommand;
using ISolutionEvent = net.r_eg.vsSBE.Events.ISolutionEvent;

namespace vsSolutionBuildEvent
{
    public class CSharpMode
    {
        public static int Init(ICommand cmd, ISolutionEvent evt)
        {
            return 0;
        }
    }
}
```


# List

* Item 1
    * Item 2
    * Item 3
        * Item4
* Item 5
    * Item 6
        * Item 7
            * Item 8
* Item 9

1. Item 1
    1. Item 2
    1. Item 3
        1. Item4
    1. Item 10
1. Item 5
    1. Item 6
        1. Item 7
            1. Item 8
1. Item 9