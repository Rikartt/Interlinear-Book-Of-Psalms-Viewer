import json
f = open('hebrew/hebrew.json', encoding='utf-8')
data = json.load(f)
psalms_hebrew = (data['Psalms'])
f.close()
def openEnglish(Chapter):
    f = open(f'BibleJSON-main/BibleJSON-main/JSON/Psalms/{Chapter}.json')
    print(f'BibleJSON-main/BibleJSON-main/JSON/Psalms/{Chapter}.json')
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
Psalms = {"chapters": []}
for i in range(1, 151):
    try:
        eng = openEnglish(i)
        for j in range(len(eng)):
            Psalms["chapters"].append(
                {'chapter': i, 
                 'verse': j + 1, 
                 'english': eng[j]['text'],
                 'header': eng[j]['header']
                })
    except Exception as e:
        print(f"Error in chapter {i}")
#print(Psalms)