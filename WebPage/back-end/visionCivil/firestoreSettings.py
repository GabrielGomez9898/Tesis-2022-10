#https://www.youtube.com/watch?v=UVzBQ0LkO28

import os
import firebase_admin
from firebase_admin import credentials, firestore , storage 

PATH = os.path.join(os.path.dirname(__file__), "serviceAccountKey.json")

cred = credentials.Certificate(PATH)
firebase_admin.initialize_app(cred)

db = firestore.client()

app = firebase_admin.initialize_app(cred, {
    'storageBucket': 'miproyecto-5cf83.appspot.com',
}, name='storage')

bucket = storage.bucket(app=app)
