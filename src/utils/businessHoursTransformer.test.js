import { transformBusinessHours } from './businessHoursTransformer';

// Example usage
const inputBusinessHours = {
  "Sunday": {
    "enabled": false,
    "slots": [
      {
        "from": "",
        "to": ""
      }
    ]
  },
  "Monday": {
    "enabled": true,
    "slots": [
      {
        "from": "0830",
        "to": "1730"
      }
    ]
  },
  "Tuesday": {
    "enabled": true,
    "slots": [
      {
        "from": "0830",
        "to": "1730"
      }
    ]
  },
  "Wednesday": {
    "enabled": true,
    "slots": [
      {
        "from": "0830",
        "to": "1730"
      }
    ]
  },
  "Thursday": {
    "enabled": true,
    "slots": [
      {
        "from": "0830",
        "to": "1700"
      }
    ]
  },
  "Friday": {
    "enabled": true,
    "slots": [
      {
        "from": "0830",
        "to": "1700"
      }
    ]
  },
  "Saturday": {
    "enabled": false,
    "slots": [
      {
        "from": "",
        "to": ""
      }
    ]
  }
};

const transformedHours = transformBusinessHours(inputBusinessHours);
console.log('Transformed Business Hours:', JSON.stringify(transformedHours, null, 2)); 