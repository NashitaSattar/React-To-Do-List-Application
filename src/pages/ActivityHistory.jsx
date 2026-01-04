import React from 'react'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext';
import ActivityItem from '../component/ActivityItem';
import { getActivities } from '../service/taskService';
import "../styles/TaskList.css"

export const ActivityHistory = () => {
  const { theme } = useTheme();
  
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  // Runs once to fetch activites from database
  useEffect(() => {
    fetchActivities();
  }, []);

  // FETCH activites from database
   const fetchActivities = async () => {
        try {
            setLoading(true);
            const response = await getActivities();

            if (Array.isArray(response.data) === false){
              setError("Invalid Data Structure");
            } else {
              const sortedActivities = response.data.sort(
                (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
              );
              setLoading(false);
              setActivities(sortedActivities);
            }
        }  catch (error) {
            setError("Failed to fetch activities");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className={`App ${theme}`}>
      {loading && 
        <p>
          Loading...
        </p>}
      {error && 
        <p style={{color: "red"}}>
          {error}
        </p>
      }
      <div>
        <h2>My Activity</h2>
        <ul>
          {activities.map(activity => (
            <ul key={activity.id}>
            <ActivityItem individual_activity={activity} />
            </ul>
          ))
          }
        </ul>
      </div>
    </div>
  )
}
