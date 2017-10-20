#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'PythonicNinja'
SITENAME = 'Think. Code. Enjoy.'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'Europe/Warsaw'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True


# THEME
THEME = 'pelican-blue'


SOCIAL = (
    # ('linkedin', 'https://www.linkedin.com/in/username'),
    ('github', 'https://github.com/PythonicNinja'),
    # ('twitter', 'https://twitter.com/username'),
)


SIDEBAR_DIGEST = 'mail@pythonic.ninja'

FAVICON = 'https://avatars0.githubusercontent.com/u/1098417?s=460&v=4'

DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = False

# TWITTER_USERNAME = 'twitter-user-name'

MENUITEMS = (('Blog', SITEURL),)


LINKS = []



