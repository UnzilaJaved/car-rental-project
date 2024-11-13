import React from 'react';

const Testimonials = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>What Our Clients Say</h2>
      <p style={styles.subHeading}>
        Our valued clients share their experiences of working with us from across the nation.
      </p>
      <div style={styles.gridContainer}>
        <div style={styles.card}>
          <p style={styles.title}>Smooth Collaboration</p>
          <p style={styles.description}>
            An extraordinary experience! The team’s coordination was exceptional, making the car rental process a breeze. Highly recommended for their professional service.
          </p>
          <div style={styles.profile}>
            <img
              style={styles.profileImage}
              src="/IMAGES/review1.jpeg"
              alt="client"
            />
            <div>
              <p style={styles.clientName}>Ali Khan</p>
              <p style={styles.clientRole}>CEO, ABC Enterprises</p>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <p style={styles.title}>User-Friendly Interface</p>
          <p style={styles.description}>
            The booking process was seamless. The platform was intuitive, making it easy to find and reserve the perfect car. I would recommend it to anyone looking for convenience.
          </p>
          <div style={styles.profile}>
            <img
              style={styles.profileImage}
              src="/IMAGES/review2.jpeg"
              alt="client"
            />
            <div>
              <p style={styles.clientName}>Sara Ahmed</p>
              <p style={styles.clientRole}>Marketing Manager</p>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <p style={styles.title}>Exceptional Service</p>
          <p style={styles.description}>
            Their service went beyond my expectations. Every detail was handled with care, making the entire experience absolutely delightful. I will surely return.
          </p>
          <div style={styles.profile}>
            <img
              style={styles.profileImage}
              src="/IMAGES/review3.jpeg"
              alt="client"
            />
            <div>
              <p style={styles.clientName}>Zainab Hassan</p>
              <p style={styles.clientRole}>Small Business Owner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '45px 10px',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: '38px', // Increased heading size
    fontWeight: '700',
    color: '#263238', // Dark grey/black for the heading
    marginBottom: '25px',
  },
  subHeading: {
    fontSize: '20px', // Increased subheading size
    color: '#607D8B', // Soft grey for subheading text
    marginBottom: '40px',
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '8px', // Increased gap between cards
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    width: '400px', // Increased card width
    padding: '40px',
    margin: '20px',
    textAlign: 'left',
  },
  title: {
    fontSize: '24px', // Increased title size
    fontWeight: '600',
    color: '#263238', // Dark grey for titles
    marginBottom: '15px',
  },
  description: {
    fontSize: '18px', // Increased description font size
    color: '#607D8B', // Soft grey for description text
    marginBottom: '20px',
    lineHeight: '1.7', // Increased line height for better readability
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '25px',
  },
  profileImage: {
    borderRadius: '50%',
    marginRight: '15px',
    width: '60px', // Increased profile image size
    height: '60px',
    objectFit: 'cover',
  },
  clientName: {
    fontSize: '18px', // Increased client name font size
    fontWeight: '600',
    color: '#263238', // Dark grey for client names
  },
  clientRole: {
    fontSize: '16px', // Increased client role font size
    color: '#607D8B', // Soft grey for client roles
  },
};

export default Testimonials;
