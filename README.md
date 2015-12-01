# LibraryFindCatalogue

## Stand-alone installation (see below for the Plone installation)

 - Install Flask `pip install Flask`
 - Launch the **ElectreConnector** (https://github.com/devBPI/ElectreWebservice)
 - Make sure the connexion configuration (`ELECTRE_WS_URL`) in `/electreProxy.py` is right
 - Launch the micro-server `python libraryFindCatalogue.py`
 - Check if the micro-server url in the `notice.js` file (`electreProxyUrl`) is correct

## Tests

To test the proxy you can try the following urls:
 - Notice with biographic information: http://127.0.0.1/quatrieme?isbn=978-2-7654-1393-6
 - Notice with only presentation: http://127.0.0.1/quatrieme?isbn=978-2221125762
 - Notice with nothing: http://127.0.0.1/quatrieme?isbn=2013963653
 - Empty table of content : http://127.0.0.1/tabledesmatieres?isbn=978-2-7654-1393-6
 - Table of content : http://127.0.0.1/tabledesmatieres?isbn=9782765408505
 - To check the javascript part, open the `sommaire.html` file in your browser

## Installation in Plone

 - **Before installing the javascript part in plone, make sure the stand-alone server is up & running.**
 - To install the script, remove the `hideDiv`, `showDivSimple`, `showDivAjax` and `showDivTab` functions from `atos/libraryfind/browser/javascript/notice.js`.
Then copy paste the content of the local `notice.js` into `atos/libraryfind/browser/javascript/notice.js`
- Make sure the `electreProxyUrl` variable is properly configured
- Restart plone (`./bin/client fg` to enable the debug mode if needed).