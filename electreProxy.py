import urllib2
import xml.etree.ElementTree as ET

from tableOfContentTransformator import TableOfContentTransformator
from backCoverTransformator import BackCoverTransformator

class NoticePage:

    ELECTRE_WS_URL = 'http://127.0.0.1:8080'

    def quatrieme(self, isbn):
        """;"""
        return self.fetch_back_cover(isbn)

    def tabledesmatieres(self, isbn):
        """;"""
        return self.fetch_table_of_content(isbn)

    def fetch_back_cover(self, isbn):
        electre_xml = ET.XML(self.fetch("quatrieme/" + isbn))
        return BackCoverTransformator(electre_xml).to_html()

    def fetch_table_of_content(self, isbn):
        electre_xml = ET.XML(self.fetch("tabledesmatieres/" + isbn))
        return TableOfContentTransformator(electre_xml).to_html()

    def fetch(self, path):
        return urllib2.urlopen(self.ELECTRE_WS_URL + '/' + path).read()