---
layout: doc
title: Create new page
permalink: /doc/New/
---
# Create new page

{% assign btnUrl = "https://github.com/3F/web.vsSBE/new/gh-pages/_doc" %}
{% assign btnValue = " Create " %}
{% assign btnType = "btn-success" %}
{% include elem/button %}

## How to in details

*We use GitHub services, so you should logged for next step.*

1. Click **[here](https://github.com/3F/web.vsSBE/new/gh-pages/_doc)**
1. Create or Select any subpath from `_doc/` directory and name your file as you want with **.md** extension.
1. Add next header:

{% highlight text %}
---
layout: doc
title: <Your title>
permalink: /doc/<path>/
---
{% endhighlight %}

* `<path>` should be to **.md** file without extension, for example:
    * Use `/doc/My Page/` if you will add the **My Page.md** in root [_doc directory](https://github.com/3F/web.vsSBE/tree/gh-pages/_doc).

That's all, use [markdown](https://help.github.com/articles/markdown-basics/) syntax, below from this header for your awesome new page. Also see existing pages for helping with formatting.

## Markdown syntax

* Test syntax on [this page](../Wiki test/)
    * https://guides.github.com/features/mastering-markdown/

### Highlighting

Use this ([GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown)):

```text

    ```lang

      your data
    ```
```

or like this:
<code>
&#123;% highlight lang %&#125;
    ...
&#123;% endhighlight %&#125;
</code>

* Where `lang` any from available **[here](http://pygments.org/languages/)**

### List

Sample:

```text

* Item 1
    * Item 2
    * Item 3
        * Item4
```

# Older wiki

We used this before:

* [https://bitbucket.org/3F/vssolutionbuildevent/wiki/](https://bitbucket.org/3F/vssolutionbuildevent/wiki/)