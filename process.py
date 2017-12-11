
from rdflib import Graph
import json
import glob
books = {}

rdf_files = glob.glob("gutindex/cache/epub/*/*.rdf")
i = 1
for rdf_file in rdf_files:
    g = Graph()
    g.parse(rdf_file)
    for s,p,o in g:
        if 'title' in p:
          books[str(o)] = str(s)
          print(i, str(o))
          i+=1


with open("gutindex_titles.json", "w") as f:
    json.dump(books, f)
    
