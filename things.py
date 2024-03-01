def helloworld(str):
    print(str)
    
helloworld('print')

import datetime
print(str(datetime.datetime.now())[0:10]
      )
m = str(datetime.datetime.now())[5:7]
md=''
if m == '`':
    md = 'Enero'
elif m == '01':
    md = 'Febreo'
elif m == '02':
    md == 'Marzo'

print(m)