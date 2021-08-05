FROM python:3.7
RUN pip install flask flask_cors numpy gunicorn PyYAML coloredlogs
COPY ./src/ /app/
WORKDIR /app
EXPOSE 8000
CMD ["gunicorn", "-b", "0.0.0.0:8000", "api:app"]
#CMD ["python", "-m", "server.app"]
#CMD ["/bin/sh", "-c", "sleep 10000"]
