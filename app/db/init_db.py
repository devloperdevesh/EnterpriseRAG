
from app.db.session import engine
from app.db.base import Base
from app.models.user import User
from app.models.tenant import Tenant
from app.models.documents import Document



def init_db():
    Base.metadata.create_all(bind=engine)

