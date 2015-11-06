---
layout: doc
title: Create new page
permalink: /doc/New/
---

<div style="text-align: left;">
<a style="width: 150px;" href="https://github.com/3F/web.vsSBE/new/gh-pages/_doc" class="btn btn-success" title="Create new wiki page">
<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Create </a></div>
<br />

## How to

1. We use GitHub services, so simply click **[here](https://github.com/3F/web.vsSBE/new/gh-pages/_doc)**
1. Create or select any subpath from `_doc/` directory and name your file as you want with **.md** extension.
1. Add next header:

```text 
---
layout: doc
title: <Your title>
permalink: /doc/<path>/
---
```

* `<path>` should be to **.md** file without extension, for example:
    * Use `/doc/My Page/` if you will add the **My Page.md** in root [_doc directory](https://github.com/3F/web.vsSBE/tree/gh-pages/_doc).

That's all, use [markdown](https://help.github.com/articles/markdown-basics/) syntax, below from this header, for your awesome new page. Also see existing pages for helping with formatting.

## Markdown syntax

* Test syntax on [this page](../Wiki test/)
    * [https://guides.github.com/features/mastering-markdown/](https://guides.github.com/features/mastering-markdown/)

### Highlighting

Use this ([GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown)):

<pre>
```lang

  your data
```
</pre>

* Where `lang` any from available **[here](http://pygments.org/languages/)**

### List

```text

* Item 1
    * Item 2
    * Item 3
        * Item4
```

### Images

```liquid
![alt](../../Resources/path)
```

With link:

```liquid
[![alt](../../Resources/path)](link)
```

## Templates

### Fillme box

{% raw %}
```liquid
{% include elem/fillme %}
```
{% endraw %}

### List of available pages from specific path

{% raw %}
```liquid
{% assign cprefix = "/PathToDoc/" %}
{% assign urlPrefix = {{site.docp | append: "/PathToDoc/"}} %}
{% include doc/List.html %}
```
{% endraw %}

### To escape liquid tags

```liquid

{{ "{% raw " }}%}
.. data 
{{ "{% endraw " }}%}

```

for source code with highlighting:

<pre>
{{ "{% raw " }}%}
```lang
  source code
```
{{ "{% endraw " }}%}
</pre>

### To display images with Lightbox

{% raw %}
```liquid
{% assign img = "image" %}{% assign attr = "width='380' height='260'" %}{% include elem/lightbox %}
```
{% endraw %}

Where:

* image - path to image file from `{{site.docp}}/Resources/`.
* width & height - size for preview.

### Info box

{% raw %}
```liquid
{% assign infoData = "data with markdown syntax" %}
{% include elem/info %}
```
{% endraw %}

With custom color:

{% raw %}
```liquid
{% assign infoColor = "#CACA35" %}
{% assign infoData  = "data with markdown syntax" %}
{% include elem/info %}
```
{% endraw %}

### Glyphicons

* [List of available](http://getbootstrap.com/components/#glyphicons-glyphs)

{% raw %}
```liquid
{% assign icon = "type" %}{% include elem/gicon %}
```
{% endraw %}

or:

```html
<span class="glyphicon type" aria-hidden="true"></span>
```

Where: 

* type - e.g.: [`glyphicon-flag`](http://getbootstrap.com/components/#glyphicons-glyphs): {% assign icon = "glyphicon-flag" %}{% include elem/gicon %}

# Old wiki

We used this before:

* [https://bitbucket.org/3F/vssolutionbuildevent/wiki/](https://bitbucket.org/3F/vssolutionbuildevent/wiki/)