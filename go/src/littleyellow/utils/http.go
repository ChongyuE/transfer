package utils

import (
	"io/ioutil"
	"net/http"
	"strings"
)

func HttpDo(url string, cookie string) (body []byte, err error) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, strings.NewReader("name=cjb"))
	if err != nil {
		// handle error
		return nil, err
	}
	// req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	// req.Header.Set("Cookie", "name=anny")
	//
	req.Header.Set("Host", "youdian.in")
	req.Header.Set("Connection", "keep-alive")
	req.Header.Set("Upgrade-Insecure-Requests", "1")
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36")
	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
	req.Header.Set("Referer", url)
	// req.Header.Set("Accept-Encoding", "gzip, deflate, sdch, br")
	req.Header.Set("Accept-Language", "zh-CN,zh;q=0.8")
	req.Header.Set("Cookie", cookie)
	resp, err := client.Do(req)
	defer resp.Body.Close()
	body, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	return body, nil
}
func HttpDoReturnRes(url, cookie string) (res *http.Response, err error) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, strings.NewReader("name=cjb"))
	if err != nil {
		// handle error
		return nil, err
	}
	req.Header.Set("Host", "youdian.in")
	req.Header.Set("Connection", "keep-alive")
	req.Header.Set("Upgrade-Insecure-Requests", "1")
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36")
	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
	req.Header.Set("Referer", url)
	// req.Header.Set("Accept-Encoding", "gzip, deflate, sdch, br")
	req.Header.Set("Accept-Language", "zh-CN,zh;q=0.8")
	req.Header.Set("Cookie", cookie)
	resp, err := client.Do(req)
	// defer resp.Body.Close()
	return resp, err
}
