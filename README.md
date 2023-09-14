# ChannelSevenCode

# Assumptions: 

font, spacing, etc., does not need to match exactly. 
Handle only the intentions in the JSON file, with the ability to handle more if required (code can be easily expanded to include more kinds).
Intentions do not nest, and should not overlap - log errors if they do and do not format the text. 

# Notes

There is a jest test for the formatText function to ensure that it is correctly handling errors. 
Article takes the URL/endpoint as a prop.

The JSON is being fetched as if it was a URL/endpoint to mimic a real usecase. 
