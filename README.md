# LibraryFindCatalogue

## Stand-alone installation (see below for the Plone installation)

 - Install Flask `pip install Flask`
 - Launch the **ElectreConnector** (https://github.com/devBPI/ElectreWebservice)
 - Make sure the connexion configuration (`ELECTRE_WS_URL`) in `/electreProxy.py` is right
 - Launch the micro-server `python libraryFindCatalogue.py`
 - Check the micro-server url in the `notice.js` file (`electreProxyUrl`) is correct

## Tests

To test the proxy you can try the following urls:
 - Notice with biographic information: http://127.0.0.1:5000/quatrieme?isbn=978-2-7654-1393-6
 - Notice with only presentation: http://127.0.0.1:5000/quatrieme?isbn=978-2221125762
 - Notice with nothing: http://127.0.0.1:5000/quatrieme?isbn=2013963653
 - Empty table of content : http://127.0.0.1:5000/tabledesmatieres?isbn=978-2-7654-1393-6
 - Table of content : http://127.0.0.1:5000/tabledesmatieres?isbn=9782765408505
 - To check the javascript part, open the `sommaire.html` file in your browser

## Installation in Plone

### Python parts

- Copy the `backCoverTransformator.py` and `tableOfContentTransformator.py` files in the `atos/libraryfind/content` folder.
- Copy the content of `electreProxy.py` (without the class declaration) in the `NoticePage` class from `atos/libraryfind/content/noticepage.py`.
**Don't forget the import declarations**
- Only if you are running python < 2.5:
    - Install ElementTree (needed for xml transformation): http://effbot.org/zone/element-index.htm#installation
    - In `backCoverTransformator.py` and `noticepage.py` change the `import xml.etree.ElementTree as ET` to `from elementtree import ElementTree as ET`.
- Make sure the `ELECTRE_WS_URL` constant is correctly configured.

### Html & Js parts

- Copy the marked part from `sommaire.html` to replace in `atos/libraryfind/browser/notice/notice.pt` the following blocs:
    - `<div id="notice_table_content" class="notice_div">`
    - `<div id="notice_back_cover" class="notice_div">`
- Then, remove the `hideDiv`, `showDivSimple`, `showDivAjax` and `showDivTab` functions from `atos/libraryfind/browser/javascript/notice.js`.
Then copy paste the content of the local `notice.js` into `atos/libraryfind/browser/javascript/notice.js`
- To finish make sure the `electreProxyUrl` variable is properly configured
- Restart plone (`./bin/client fg` to enable the debug mode if needed).