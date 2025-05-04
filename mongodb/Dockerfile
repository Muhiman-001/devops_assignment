FROM mongo:6.0

# Set ownership of data directory
RUN chown -R mongodb:mongodb /data/db

# Switch to mongodb user
USER mongodb

# Expose MongoDB port
EXPOSE 27017

# Start MongoDB with authentication
CMD ["mongod", "--bind_ip_all"] 