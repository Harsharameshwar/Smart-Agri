from flask import Flask, jsonify
import plotly
import plotly.graph_objects as go
import json
from flask_cors import CORS

import mysql.connector
import pandas as pd
import numpy as np
import plotly.express as px
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import warnings
from sklearn.impute import SimpleImputer
pd.options.display.max_rows = 9999
from werkzeug.serving import run_simple

def conection():
    mydb = mysql.connector.connect(
    host="mydesk.tk",
    user="hms",
    password="",
    database="smartagri"
    )
    query=("SELECT * FROM sensor_data_entity")
    data = pd.read_sql(query, mydb)

    # Close the MySQL connection
    mydb.close()

    #save the data to csv file
    data.to_csv('mydata.csv', index=False)

    # Load the CSV file into a new DataFrame to verify the data was saved correctly
    df = pd.read_csv('mydata.csv')

    # Print the DataFrame
    return df


################################ Connection And Initial Code #############################################
df= conection()

weather = df.copy()
weather = weather.drop(['id','gridstatus','dd_id','motor_status','ue_userid'], axis=1)

# Extract additional features from date column
weather['date'] = pd.to_datetime(weather['date'])
weather['year'] = weather['date'].dt.year
weather['month'] = weather['date'].dt.month
weather['day'] = weather['date'].dt.day
weather.rename(columns = {'humi':'Humidity','raind':'Rain-Fall','soilm':'Soil Moisture','temp':'Temperature','grid':'Grid Voltage'}, inplace = True)
# print(weather.head())
###########################################################################################################

app = Flask(__name__)
CORS(app)
app.debug=True



################################ Machine Learning Code ######################################
weather['date'] = pd.to_datetime(weather['date'])

# Extract the day of the year from the 'date' column
weather['day_of_year'] = weather['date'].dt.dayofyear

# Split the data into features and target variables
X = weather[['day_of_year', 'Temperature','Humidity', 'Rain-Fall', 'Soil Moisture']]
y_temperature = weather['Temperature']
y_rainfall = weather['Rain-Fall']
y_soil_moisture = weather['Soil Moisture']
y_humidity = weather['Humidity']

# Split the data into training and testing sets
X_train, X_test, y_temp_train, y_temp_test, y_rain_train, y_rain_test, y_soil_train, y_soil_test, y_hum_train, y_hum_test = train_test_split(
    X, y_temperature, y_rainfall, y_soil_moisture, y_humidity, test_size=0.2, random_state=42)

# Create the random forest models
model_temperature = RandomForestRegressor()
model_rainfall = RandomForestRegressor()
model_soil_moisture = RandomForestRegressor()
model_humidity = RandomForestRegressor()

# Train the models
model_temperature.fit(X_train, y_temp_train)
model_rainfall.fit(X_train, y_rain_train)
model_soil_moisture.fit(X_train, y_soil_train)
model_humidity.fit(X_train, y_hum_train)

# Evaluate the models
y_temp_pred = model_temperature.predict(X_test)
y_rain_pred = model_rainfall.predict(X_test)
y_soil_pred = model_soil_moisture.predict(X_test)
y_hum_pred = model_humidity.predict(X_test)

# Get the past 10 days of data
past_data = weather.tail(10)

# Generate dates for the next 10 days
start_date = pd.to_datetime(weather['date'].max()) + pd.DateOffset(days=1)
end_date = start_date + pd.DateOffset(days=9)
dates = pd.date_range(start=start_date, end=end_date, freq='D')

# Create a DataFrame for predictions
predictions_df = pd.DataFrame({'date': dates})

# Extract the features from the past data
X = past_data[['day_of_year', 'Temperature','Humidity', 'Rain-Fall', 'Soil Moisture']]

# Make predictions for Humidity
predictions_humidity = model_humidity.predict(X)
predictions_df['Humidity'] = predictions_humidity

# Make predictions for Rainfall
predictions_rainfall = model_rainfall.predict(X)
predictions_df['Rainfall'] = predictions_rainfall

# Make predictions for Soil Moisture
predictions_soil_moisture = model_soil_moisture.predict(X)
predictions_df['Soil Moisture'] = predictions_soil_moisture

# Make predictions for Temperature
predictions_temperature = model_temperature.predict(X)
predictions_df['Temperature'] = predictions_temperature
#############################################################################################



#############################################################################################

Irrigation_optimiser = df.drop(['dd_id','ue_userid','motor_status','id','grid'], axis=True)
Irrigation_optimiser
Irrigation_optimiser.rename(columns = {'humi':'Humidity','raind':'Rainfall','soilm':'Soil Moisture','temp':'Temperature','gridstatus':'Borewell'}, inplace = True)




#############################################################################################



################################################# API's #####################################
@app.route('/generate-rain-graph', methods=['GET'])
def generate_graph():
    # Your Machine Learning code here to generate data for the graph

    # Use Plotly to create the graph
    fig = px.line(weather, x='date', y='Rain-Fall', title='Rainfall over Time')
    # Add more traces or modify the graph as necessary

    # Convert the Plotly graph to JSON and return it
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return jsonify(graphJSON)


@app.route('/generate-soil-graph', methods=['GET'])
def generate_soil_graph():
    # Your Machine Learning code here to generate data for the graph
    soil = weather.copy()   
    conditions = [
    (soil['Soil Moisture'] >= 900) & (soil['Soil Moisture'] < 1024),
    (soil['Soil Moisture'] >= 800) & (soil['Soil Moisture'] < 900),
    (soil['Soil Moisture'] >= 500) & (soil['Soil Moisture'] < 800),
    (soil['Soil Moisture'] >= 300) & (soil['Soil Moisture'] < 500),
    (soil['Soil Moisture'] < 300)
]

# Define the corresponding weather reports
    soil_reports = [
        'No Moisture',
        'Moisture is low ',
        'Medium Moisture',
        'Moisture is very high',
        'Moisture is high'
    ]

    # Create the 'Weather-Report' column based on conditions and weather reports
    soil['Soil Moisture Report'] = pd.Series(pd.Categorical(np.select(conditions, soil_reports), categories=soil_reports))

# Visualize 'Weather-Report' column using Plotly
    fig = px.line(soil, x='date', y='Soil Moisture Report', title='Soil Moisture Report over Time')

    # Use Plotly to create the graph
    # fig = px.line(weather, x='date', y='Soil Moisture', title='Soil Moisture over Time')
    # Add more traces or modify the graph as necessary

    # Convert the Plotly graph to JSON and return it
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return jsonify(graphJSON)


@app.route('/generate-temperature-graph', methods=['GET'])
def generate_temperature_graph():
    # Your Machine Learning code here to generate data for the graph

    # Use Plotly to create the graph
    fig = px.line(weather, x='date', y='Temperature', title='Temperature over Time')
    # Add more traces or modify the graph as necessary

    # Convert the Plotly graph to JSON and return it
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return jsonify(graphJSON)

@app.route('/generate-humiditiy-graph', methods=['GET'])
def generate_humidity_graph():
    # Your Machine Learning code here to generate data for the graph

    fig = px.line(weather, x='date', y='Humidity', title='Humidity over Time')
    # fig.show()
    # Add more traces or modify the graph as necessary

    # Convert the Plotly graph to JSON and return it
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return jsonify(graphJSON)

@app.route('/generate-grid-graph', methods=['GET'])
def generate_grid_graph():
    # Your Machine Learning code here to generate data for the graph

    fig = px.line(weather, x='date', y='Grid Voltage', title='Grid Voltage over Time')
    # fig.show()
    # Add more traces or modify the graph as necessary

    # Convert the Plotly graph to JSON and return it
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return jsonify(graphJSON)

@app.route('/generate-weatherreport', methods=['GET'])
def generate_weatherreport():
    report = weather.copy()
    # Define the conditions for weather report
    conditions = [
        (report['Rain-Fall'] >= 900) & (report['Rain-Fall'] < 1024),
        (report['Rain-Fall'] >= 800) & (report['Rain-Fall'] < 900),
        (report['Rain-Fall'] >= 500) & (report['Rain-Fall'] < 800),
        (report['Rain-Fall'] >= 300) & (report['Rain-Fall'] < 500),
        (report['Rain-Fall'] < 300)
    ]

    # Define the corresponding weather reports
    weather_reports = [
        'Cloudless and Hot',
        'Sunny Day',
        'Warm day with scattered clouds',
        'Cloudy Day, mostly overcast',
        'Rainy Day'
    ]

    # Create the 'Weather-Report' column based on conditions and weather reports
    report['Weather-Report'] = pd.Series(pd.Categorical(np.select(conditions, weather_reports), categories=weather_reports))

    # Generate the Plotly graph
    fig = px.line(report, x='date', y='Weather-Report', title='Weather Report over Time')
    plotly_graph = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)


    predictions_report = predictions_df.copy()
    conditions = [
    (predictions_report['Rainfall'] >= 900) & (predictions_report['Rainfall'] < 1024),
    (predictions_report['Rainfall'] >= 800) & (predictions_report['Rainfall'] < 900),
    (predictions_report['Rainfall'] >= 500) & (predictions_report['Rainfall'] < 800),
    (predictions_report['Rainfall'] >= 300) & (predictions_report['Rainfall'] < 500),
    (predictions_report['Rainfall'] < 300)
]

# Define the corresponding weather reports
    weather_reports = [
        'Cloudless and Hot',
        'Sunny Day',
        'Warm day with scattered clouds',
        'Cloudy Day, mostly overcast',
        'Rainy Day'
    ]


    # Create the 'Weather-Report' column based on conditions and weather reports
    predictions_report['Weather_Report'] = pd.Series(pd.Categorical(np.select(conditions, weather_reports), categories=weather_reports))

    # Visualize 'Weather-Report' column using Plotly
    fig1 = px.line(predictions_report, x='date', y='Weather_Report', title='Weather Report over Time')
    plotly_graph1 = json.dumps(fig1, cls=plotly.utils.PlotlyJSONEncoder)

    # fig1.show()

    # Generate the Seaborn graph
    plt.figure(figsize=(10, 6), facecolor='#3f4494')  # Set the background color
    # sns.set(style='dark', font_scale=1.2)

    # sns.lineplot(data=report, x='date', y='Weather-Report')
    plt.xlabel('Date', color='white')  # Set the x-axis label color
    plt.ylabel('Weather Report', color='white')  # Set the y-axis label color
    plt.title('Weather Report over Time', color='white')  # Set the title color

    # Remove the grid lines inside the graph
    plt.grid(False)

    # Set the background color of the plotting area
    plt.gca().set_facecolor('#141b2d')

    # Set the color and font size of the x-axis tick labels
    plt.xticks(color='white', fontsize=10)

    # Set the color and font size of the y-axis tick labels
    plt.yticks(color='white', fontsize=10)

    plt.close()

    json_data = predictions_report.to_json(orient='records')

    return jsonify({
        'plotlyGraph': plotly_graph,
        'plotlyGraph1': plotly_graph1,
        'json_data':json_data
    })


@app.route('/generate-sensorreports', methods=['GET'])
def generate_sensorreports():
    conditions = [
    (Irrigation_optimiser['Soil Moisture'] >= 900) & (Irrigation_optimiser['Soil Moisture'] < 1024),
    (Irrigation_optimiser['Soil Moisture'] >= 800) & (Irrigation_optimiser['Soil Moisture'] < 900),
    (Irrigation_optimiser['Soil Moisture'] >= 500) & (Irrigation_optimiser['Soil Moisture'] < 800),
    (Irrigation_optimiser['Soil Moisture'] >= 300) & (Irrigation_optimiser['Soil Moisture'] < 500),
    (Irrigation_optimiser['Soil Moisture'] < 300)
]

# Define the corresponding weather reports
    soil_reports = [
        'No Moisture',
        'Moisture is low ',
        'Medium Moisture',
        'Moisture is high',
        'Moisture is very high'
    ]

    # Create the 'Weather-Report' column based on conditions and weather reports
    Irrigation_optimiser['Soil Moisture Report'] = pd.Series(pd.Categorical(np.select(conditions, soil_reports), categories=soil_reports))

    fig = px.line(predictions_df, x='date', y='Humidity', title='Predicted Humidity over Time')
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    # fig.show()

    fig1 = px.line(predictions_df, x='date', y='Rainfall', title='Predicted Rainfall over Time')
    graphJSON1 = json.dumps(fig1, cls=plotly.utils.PlotlyJSONEncoder)
    # fig.show()

    fig2 = px.line(predictions_df, x='date', y='Soil Moisture', title='Predicted Soil Moisture over Time')
    graphJSON2 = json.dumps(fig2, cls=plotly.utils.PlotlyJSONEncoder)
    # fig.show()

    fig3 = px.line(predictions_df, x='date', y='Temperature', title='Predicted Temperature over Time')
    graphJSON3 = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    # fig.show()

    return jsonify({
        'tempGraph': graphJSON3,
        'soilGraph': graphJSON2,
        'rainGraph':graphJSON1,
        'humiGraph':graphJSON

    })
##############################################################################################

# Convert the 'date' column to datetime format

@app.route('/generate-irrigationvisalization-report', methods=['GET'])
def generate_irrigationvisalizationreport():
    fig_borewell = px.scatter(Irrigation_optimiser, x='Soil Moisture', y='Borewell', title='Soil Moisture vs. Borewell')
    fig_borewell.update_traces(marker=dict(color='red'))
    graph_borewell = json.dumps(fig_borewell, cls=plotly.utils.PlotlyJSONEncoder)
    # fig_borewell.show()

    fig_temperature = px.scatter(Irrigation_optimiser, x='Soil Moisture', y='Temperature', title='Soil Moisture vs. Temperature'
    )
    fig_temperature.update_traces(marker=dict(color='red'))
    
    graph_temperature = json.dumps(fig_temperature, cls=plotly.utils.PlotlyJSONEncoder)
    # fig_temperature.show()

    fig_humidity = px.scatter(Irrigation_optimiser, x='Soil Moisture', y='Humidity', title='Soil Moisture vs. Humidity')
    # fig_humidity.show()
    fig_humidity.update_traces(marker=dict(color='red'))
    graph_humidity = json.dumps(fig_humidity, cls=plotly.utils.PlotlyJSONEncoder)
    

    fig_rainfall = px.scatter(Irrigation_optimiser, x='Soil Moisture', y='Rainfall', title='Soil Moisture vs. Rainfall')
    # fig_rainfall.show()
    fig_rainfall.update_traces(marker=dict(color='red'))
    graph_rainfall = json.dumps(fig_rainfall, cls=plotly.utils.PlotlyJSONEncoder)


    melted_data = pd.melt(Irrigation_optimiser, id_vars='Soil Moisture', value_vars=['Borewell', 'Humidity', 'Rainfall', 'Temperature'])

    fig = px.scatter(melted_data, x='Soil Moisture', y='value', color='variable',
                    title='Soil Moisture vs. Other Columns')
    # fig.show()
    graph_report = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

    return jsonify({
        'graph_borewell': graph_borewell,
        'graph_temperature': graph_temperature,
        'graph_humidity':graph_humidity,
        'graph_rainfall':graph_rainfall,
        'graph_report':graph_report,


    })





@app.route('/generate-irrigation-report', methods=['GET'])
def generate_irrigationreport():
    Irrigation_optimiser1=Irrigation_optimiser.copy()
    Irrigation_optimiser1['datetime'] = pd.to_datetime(Irrigation_optimiser1['date'] + ' ' + Irrigation_optimiser1['time'])
    Irrigation_optimiser1.drop(['date', 'time'], axis=1, inplace=True)
    Irrigation_optimiser1['Borewell'] = np.where(Irrigation_optimiser1['Borewell'] == 'on', 1, 0)
    X = Irrigation_optimiser1[['Borewell', 'Humidity', 'Rainfall', 'Soil Moisture', 'Temperature']]
    y = Irrigation_optimiser1['Soil Moisture']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    y_pred = model.predict(X_test)

    # Get the latest datetime in the dataset
    latest_datetime = Irrigation_optimiser1['datetime'].max()

    # Generate datetime values for the next 5 days
    date_range = pd.date_range(latest_datetime + pd.DateOffset(hours=1), periods=5*24, freq='H')

    predictions = pd.DataFrame({'datetime': date_range})

    # Set initial borewell status as off
    predictions['Borewell'] = 0
    predictions['Humidity'] = Irrigation_optimiser1['Humidity'].mean()  # Set average humidity as a placeholder
    predictions['Rainfall'] = Irrigation_optimiser1['Rainfall'].mean()  # Set average rainfall as a placeholder
    predictions['Temperature'] = Irrigation_optimiser1['Temperature'].mean()  # Set average temperature as a placeholder
    predictions['Soil Moisture'] = Irrigation_optimiser1['Soil Moisture'].mean()  # Set average soil moisture as a placeholder
    # Suppress all warnings
    warnings.filterwarnings("ignore")

    # Make predictions for the next 5 days
    for i in range(len(predictions)):
        # Set average humidity, rainfall, temperature, and soil moisture as placeholders
        predictions.loc[i, 'Humidity'] = Irrigation_optimiser1['Humidity'].mean()
        predictions.loc[i, 'Rainfall'] = Irrigation_optimiser1['Rainfall'].mean()
        predictions.loc[i, 'Temperature'] = Irrigation_optimiser1['Temperature'].mean()
        predictions.loc[i, 'Soil Moisture'] = Irrigation_optimiser1['Soil Moisture'].mean()

        # Convert 'on' and 'off' to numerical representation
        prediction_data = predictions[['Borewell', 'Humidity', 'Rainfall', 'Soil Moisture', 'Temperature']]
        prediction_data['Borewell'] = 0

        # Impute missing values with column means
        imputer = SimpleImputer(strategy='mean')
        prediction_data = pd.DataFrame(imputer.fit_transform(prediction_data), columns=prediction_data.columns)

        # Predict borewell status
        predicted_borewell_status = model.predict(prediction_data)
        predictions.loc[i, 'Borewell'] = 'on' if predicted_borewell_status[0] > 0.5 else 'off'

        # Update the soil moisture placeholder with the predicted value
        predictions.loc[i, 'Soil Moisture'] = predicted_borewell_status[0]
    conditions = [
    (predictions['Soil Moisture'] >= 900) & (predictions['Soil Moisture'] < 1024),
    (predictions['Soil Moisture'] >= 800) & (predictions['Soil Moisture'] < 900),
    (predictions['Soil Moisture'] >= 500) & (predictions['Soil Moisture'] < 800),
    (predictions['Soil Moisture'] >= 300) & (predictions['Soil Moisture'] < 500),
    (predictions['Soil Moisture'] < 300)
   ]

# Define the corresponding weather reports
    soil_reports = [
        'No Moisture',
        'Moisture is low ',
        'Medium Moisture',
        'Moisture is high',
        'Moisture is very high'
    ]

    # Create the 'Weather-Report' column based on conditions and weather reports
    predictions['Soil_Moisture_Report'] = pd.Series(pd.Categorical(np.select(conditions, soil_reports), categories=soil_reports))
    fig1 = px.line(predictions, x='datetime', y='Borewell', title='Predicted Borewell Status')
    graph_borewell = json.dumps(fig1, cls=plotly.utils.PlotlyJSONEncoder)
    # fig1.show()
    fig2 = px.line(predictions, x='datetime', y='Soil Moisture', title='Predicted Soil Moisture')
    graph_soil = json.dumps(fig2, cls=plotly.utils.PlotlyJSONEncoder)
    # fig1.show()


    json_data = predictions.to_json(orient='records')
    return jsonify({
        'plotlyGraph': graph_borewell,
        'plotlyGraph1': graph_soil,
        'json_data':json_data
    })




@app.route('/generatemotorandvalve', methods=['GET'])
def generate_motorandvalve():
    mydb = mysql.connector.connect(
    host="mydesk.tk",
    user="hms",
    password="",
    database="smartagri"
 )
    query=("SELECT * FROM history")
    data = pd.read_sql(query, mydb)

    # Close the MySQL connection
    mydb.close()

    #save the data to csv file
    data.to_csv('mydatas.csv', index=False)

    # Load the CSV file into a new DataFrame to verify the data was saved correctly
    df = pd.read_csv('mydatas.csv')

    # Print the DataFrame
    df

    action = df.copy()
    action.dropna(inplace=True)
    motor_data = action[action['type'] == 'motor'].copy()
    valve_data = action[action['type'] == 'valve'].copy()

    motor_data.reset_index(drop=True, inplace=True)

# Combine action of adjacent rows
    motor_data['combined_action'] = motor_data.groupby(motor_data.index // 2)['action'].transform(lambda x: ' - '.join(x))
    motor_data['combined_description'] = motor_data.groupby(motor_data.index // 2)['description'].transform(lambda x: ' - '.join(x))

# Calculate duration between rows
    motor_data['time'] = pd.to_datetime(motor_data['time'])
    motor_data['duration'] = motor_data.groupby(motor_data.index // 2)['time'].transform(lambda x: x.diff().shift(-1))
    motor_data['duration'] = motor_data['duration'].dt.total_seconds().fillna(0).astype(int)
    motor_data['duration'] = pd.to_datetime(motor_data['duration'], unit='s').dt.strftime('%H:%M:%S')

    # Set 'time' column as the index and drop unnecessary columns
    motor_data.set_index('time', inplace=True)
    motor_data.drop(['id', 'action', 'description', 'type', 'date'], axis=1, inplace=True)

    #Motor Duration
    fig = px.bar(motor_data, x='combined_action', y='duration', title='Duration for Each Combined Action')
    fig.update_xaxes(title='Combined Action')
    fig.update_yaxes(title='Duration')
    # fig.show()
    graph_motorduration = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)


    #Motor Analysis
    fig1 = go.Figure()

# Add duration trace
    fig1.add_trace(go.Scatter(
        x=motor_data.index,
        y=motor_data['duration'],
        name='Duration',
        yaxis='y'
    ))

    # Add action trace
    fig1.add_trace(go.Scatter(
        x=motor_data.index,
        y=motor_data['combined_action'].astype(str),
        name='Combined Action',
        yaxis='y2',
    ))

    # Add description trace
    fig1.add_trace(go.Scatter(
        x=motor_data.index,
        y=motor_data['combined_description'].astype(str),
        name='Combined Description',
        yaxis='y3',
    ))

    # Set layout
    fig1.update_layout(
        title='Motor Data',
        xaxis=dict(title='Time'),
        yaxis=dict(title='Duration (minutes)', side='left', position=0.05),
        yaxis2=dict(title='Combined Action', side='right', position=0.25, overlaying='y'),
        yaxis3=dict(title='Combined Description', side='right', position=0.45, overlaying='y'),
    )
    # fig1.show()
    graph_motoranalysis = json.dumps(fig1, cls=plotly.utils.PlotlyJSONEncoder)



    valve_data.reset_index(drop=True, inplace=True)

# Combine action of adjacent rows
    valve_data['combined_action'] = valve_data.groupby(valve_data.index // 2)['action'].transform(lambda x: ' - '.join(x))

    # Combine description of adjacent rows
    valve_data['combined_description'] = valve_data.groupby(valve_data.index // 2)['description'].transform(lambda x: ' - '.join(x))

    # Calculate duration between rows
    valve_data['time'] = pd.to_datetime(valve_data['time'])
    valve_data['duration'] = valve_data.groupby(valve_data.index // 2)['time'].transform(lambda x: x.diff().shift(-1))
    valve_data['duration'] = valve_data['duration'].dt.total_seconds().fillna(0).astype(int)
    valve_data['duration'] = pd.to_datetime(valve_data['duration'], unit='s').dt.strftime('%H:%M:%S')

    # Set 'time' column as the index and drop unnecessary columns
    valve_data.set_index('time', inplace=True)
    valve_data.drop(['id', 'action', 'description', 'type', 'date'], axis=1, inplace=True)


    fig_valve = px.bar(valve_data, x='combined_action', y='duration', title='Duration for Each Combined Action')
    fig_valve.update_xaxes(title='Combined Action')
    fig_valve.update_yaxes(title='Duration')
    # fig_valve.show()
    graph_valveduration = json.dumps(fig_valve, cls=plotly.utils.PlotlyJSONEncoder)



    fig_val = go.Figure()

# Add duration trace
    fig_val.add_trace(go.Scatter(
        x=valve_data.index,
        y=valve_data['duration'],
        name='Duration',
        yaxis='y'
    ))

    # Add action trace
    fig_val.add_trace(go.Scatter(
        x=valve_data.index,
        y=valve_data['combined_action'].astype(str),
        name='Combined Action',
        yaxis='y2',
    ))

    # Add description trace
    fig_val.add_trace(go.Scatter(
        x=valve_data.index,
        y=valve_data['combined_description'].astype(str),
        name='Combined Description',
        yaxis='y3',
    ))

    # Set layout
    fig_val.update_layout(
    title='Valve Data',
    xaxis=dict(title='Time'),
    yaxis=dict(title='Duration (minutes)', side='left', position=0.05, color='blue'),
    yaxis2=dict(title='Combined Action', side='right', position=0.25, overlaying='y', color='green'),
    yaxis3=dict(title='Combined Description', side='right', position=0.45, overlaying='y', color='red'),
)


    # Show the plot
    # fig_val.show()
    graph_valveanalysis = json.dumps(fig_val, cls=plotly.utils.PlotlyJSONEncoder)

    return jsonify({
        'graph_motorduration': graph_motorduration,
        'graph_motoranalysis': graph_motoranalysis,
        'graph_valveduration': graph_valveduration,
        'graph_valveanalysis': graph_valveanalysis
    })




if __name__ == '__main__':
    run_simple('localhost', 5001, app)