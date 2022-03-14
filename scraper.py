from bs4 import BeautifulSoup
import requests
import time

def linkedin_jobs(url):
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'html.parser')
    
    # iframe_src = soup.select_one
    searchRes = soup.find(class_="jobs-search__results-list")
    jobs = searchRes.find_all("li")
    print(len(jobs))
    # for job in jobs:
    #   print(job.div.a.prettify())
    
if __name__ == "__main__":
    url = "https://www.linkedin.com/jobs/draftkings-inc.-jobs-worldwide?f_C=2038354%2C2507852&trk=top-card_top-card-primary-button-top-card-primary-cta&position=1&pageNum=0" #'https://www.linkedin.com/jobs/search/?position=1&pageNum=0' # 'http://www.w3schools.com/html/html_iframe.asp'
    # time.sleep(5)
    linkedin_jobs(url)
    
# "https://www.linkedin.com/jobs/search/?keywords=&location=United%20States&locationId=&geoId=103644278&position=1&pageNum=0"
# "https://www.linkedin.com/jobs/search/?keywords=&location=United%20States&locationId=&geoId=103644278&f_TPR=&f_C=3439&position=1&pageNum=0"

