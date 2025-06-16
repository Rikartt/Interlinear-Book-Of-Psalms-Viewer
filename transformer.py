import json
import os
f = open('hebrew/hebrew.json', encoding='utf-8')
data = json.load(f)
psalms_hebrew = (data['Psalms'])
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
    f = open(f'{output_path}\\Psalm{n}.json', 'w', encoding='utf-8')
    for i in Psalms['chapters']:
        if i['chapter'] == n:
            f.write(json.dumps(i, ensure_ascii=False) + '\n')
    f.close()
#print(Psalms)