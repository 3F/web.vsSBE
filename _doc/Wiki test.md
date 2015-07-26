---
layout: doc
title: Test page for Wiki features
permalink: /doc/Wiki test/
---

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
