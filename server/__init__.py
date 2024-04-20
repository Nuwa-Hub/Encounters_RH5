import logging
import warnings
from logging.config import dictConfig
from pathlib import Path
import yaml
import pathlib
import os
from dotenv import load_dotenv

logging.captureWarnings(True)

warnings.simplefilter("default")


CWD = pathlib.Path(os.getcwd())


def load_logger():
    log_file = Path(__file__).parent / "logger.yml"

    with open(log_file, 'r') as stream:
        dictConfig(yaml.safe_load(stream))


load_logger()
load_dotenv(os.path.join(os.path.abspath(os.path.dirname(__file__)), '.env'))
