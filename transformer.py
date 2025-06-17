import json
import os
f = open('hebrew/hebrew.json', encoding='utf-8')
data = json.load(f)
psalms_hebrew = (data['Psalms'])
f.close()
with open('strongs-master\strongs-master\strongs-hebrew-dictionary.json', 'r', encoding='utf-8') as f:
    strongs = json.load(f)
    print()
    f.close()
def openEnglish(Chapter):
    f = open(f'BibleJSON-main/BibleJSON-main/JSON/Psalms/{Chapter}.json', encoding='utf-8')
    #print(f'BibleJSON-main/BibleJSON-main/JSON/Psalms/{Chapter}.json')
    retlis = []
    for i in json.load(f)["verses"]:
        retlis.append({
                "text": i["text"],
                "header": i.get("header", "").strip()  # safe fallback
        })
        #retlis.append(i["text"])
        #print(f"Chapter {Chapter} verse {i} read!")
    #print(retlis)
    f.close()
    return retlis
#Get hebrew bible
f = open('D:\Things I need to Pyth\Websites\BOOK OF PSALMS\hebrew\hebrew.json', 'r', encoding='utf-8')
heb = json.load(f)
def transformhebrew(l):
    returnlis = {}
    for book_name, chapters in l.items():
        cs = []
        for chapter_index, chapter in enumerate(chapters):
            c = []
            for verse_index, verse in enumerate(chapter):
                words = []
                for word_index, word_data in enumerate(verse):
                    word, strong, morph = word_data
                    words.append({
                        'word': word.split("/"),
                        'strong': strong.split("/"),
                        'morph': morph.split("/"),
                        'lemma': [strongs.get(x, {}).get('lemma') for x in strong.split("/")],
                        'xlit': [strongs.get(x, {}).get('xlit') for x in strong.split("/")],
                        'pron': [strongs.get(x, {}).get('pron') for x in strong.split("/")],
                        'derivation': [strongs.get(x, {}).get('derivation') for x in strong.split("/")],
                        'strongs_def': [strongs.get(x, {}).get('strongs_def') for x in strong.split("/")],
                        'gloss': [strongs.get(x, {}).get('kjv_def') for x in strong.split("/")]
                    })
                c.append(words)
            cs.append(c)
        returnlis[book_name] = cs
    return returnlis
heb = transformhebrew(heb)
f.close()
Psalms = {"chapters": []}
for i in range(1, 151):
    try:
        eng = openEnglish(i)
        if len(eng) != len(heb['Psalms'][i - 1]):
            print(f"⚠️ Mismatch in chapter {i}: {len(eng)} English vs {len(heb['Psalms'][i - 1])} Hebrew")
            continue
        for j in range(len(eng)):
            Psalms["chapters"].append(
                {'chapter': i, 
                 'verse': j + 1, 
                 'english': eng[j]['text'],
                 'hebrew': heb['Psalms'][i - 1][j],
                 'header': eng[j]['header']
                })
    except Exception as e:
        print(f"Error in chapter {i}: {type(e).__name__} - {e}")

#main part where file is inputted
outputdir = input('output directory: ')
if not os.path.isdir(outputdir):
    outputdir = os.getcwd()
output_path = os.path.join(outputdir, 'transformeroutput')
os.makedirs(output_path, exist_ok=True)
for n in range(1, 151):
    chapter_verses = [v for v in Psalms['chapters'] if v['chapter'] == n]
    out = {
        "psalm": n,
        "verses": chapter_verses
    }
    with open(os.path.join(output_path, f'psalm{n}.json'), 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

#print(Psalms)