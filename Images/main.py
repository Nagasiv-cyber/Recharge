from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS so your frontend can communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Your mock database of student profiles
profiles_db = [
    { "name": "K. Visagan", "dept": "AIML, Section D", "img": "image_e0b039.jpg.png", "strong": "Python • ML", "weak": "Advanced UI/UX", "bio": "Working on a quant project. Need someone who can help build a clean web interface for it." },
    { "name": "Priya M.", "dept": "Computer Science", "img": "image_e0b078.jpg.png", "strong": "Java • Data Structures", "weak": "Microcontrollers", "bio": "Prepping for placement season! Let's grind LeetCode together." },
    { "name": "Ananya S.", "dept": "Information Tech", "img": "image_e0b0d8.jpg.png", "strong": "UI/UX Design", "weak": "Backend Databases", "bio": "I can make your projects look beautiful if you help me connect a DB." },
    { "name": "Sneha R.", "dept": "Mechanical Eng.", "img": "image_e0b0f9.jpg.png", "strong": "AutoCAD • Thermo", "weak": "C Programming", "bio": "Huge sports fan! Need a study buddy to help me pass my coding electives." },
    { "name": "Kavya T.", "dept": "Biomedical Eng.", "img": "image_e0b119.jpg.png", "strong": "Anatomy", "weak": "Signal Processing", "bio": "Looking for study partners for the upcoming midterms. Coffee addict ☕." },
    { "name": "Rhea J.", "dept": "Chemical Eng.", "img": "image_e0b3fd.png.png", "strong": "Organic Chem", "weak": "Fluid Dynamics", "bio": "Always looking for someone to review lab reports with." },
    { "name": "Neha V.", "dept": "AIML", "img": "image_e0b49b.jpg.png", "strong": "Data Analytics", "weak": "Cloud Deployment", "bio": "Trying to figure out AWS for a machine learning model." },
    { "name": "Aditi K.", "dept": "Computer Science", "img": "image_e0b4d4.jpg.png", "strong": "C++ • Algorithms", "weak": "Public Speaking", "bio": "I can help you debug your code if you help me practice for presentations!" },
    { "name": "Rahul S.", "dept": "Electronics", "img": "image_e0b79c.jpg.png", "strong": "IoT • Arduino", "weak": "Python Scripting", "bio": "Building a smart-home prototype. Need a software dev." },
    { "name": "Karthik N.", "dept": "Robotics", "img": "image_e0b7c3.jpg.png", "strong": "Kinematics • ROS", "weak": "Dieting", "bio": "Will trade robotics tutoring for recommendations on the best food spots." }
]

@app.get("/api/profiles")
def get_profiles():
    """
    In a fully production-ready app, your matching logic would go here.
    It would analyze the active user's data and query the database for matches.
    For this prototype, we return the mock dataset.
    """
    return profiles_db
