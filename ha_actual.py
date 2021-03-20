
# In[63]:

import sys,json
import pickle
loaded_model = pickle.load(open('HA_model_final.sav', 'rb'))


# In[64]:


import pandas as pd 
df=pd.read_csv('heart.csv')
df.columns


# In[65]:




# In[69]:


def user_input(): 
    # M=[57,1,0,130,131,0,1,115,1,1.2,1,1,3]
    M=json.loads(sys.argv[1])
    
        
    return M


# In[70]:


#user_input()


# In[84]:


predict1=user_input()


# In[85]:


import numpy as np
predict1 = np.array(predict1).reshape(1, len(predict1))


# In[86]:


output=loaded_model.predict(predict1)


# In[87]:


if output[0]==False:
    print("You have less chance of heart attack")
if output[0]==True:
    print("You have more chance of heart attack")


# In[ ]:





# In[ ]:




