import pandas as pd


def main(event, context):
    # save event to logs
    print(event)
    pd.DataFrame({"hans": ["wurst"]})
    return {"statusCode": 200, "body": "hi du arschgeige"}
