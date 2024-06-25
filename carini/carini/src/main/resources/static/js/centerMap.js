var map;
var mapContainer = document.getElementById('map');

function initializeMap(agenciesArray) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var currentPosition = new kakao.maps.LatLng(position.coords.latitude + 0.0095606, position.coords.longitude + 0.0083313);
    
            var mapOption = {
                center: currentPosition, // 지도의 중심 좌표 - 현재 위치
                level: 6 // 지도의 확대 레벨
            };
    
            // 지도 생성
            map = new kakao.maps.Map(mapContainer, mapOption);
    
            // positions 배열 생성
            var positions = agenciesArray.map(function(agency) {
                return {
                    title: agency.agencyName,
                    latlng: new kakao.maps.LatLng(agency.agencyLat, agency.agencyLon),
                    brand: agency.carBrand,
                    tel: agency.agencyTel,
                    address: agency.agencyAddress
                };
            });
   


            // 현재 열린 모든 인포윈도우를 저장할 배열
            var openInfoWindows = [];

            function closeAllInfoWindows() {
                for (var i = 0; i < openInfoWindows.length; i++) {
                    openInfoWindows[i].close();
                }
                openInfoWindows = [];
            }

            for (let i = 0; i < positions.length; i++) {
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: positions[i].latlng,
                });
                
                var contentString = `
                	<div style="padding:10px; width:625px; height:100px;background-color:whitesmoke;margin-bottom:100px;border-radius:10px">
                        <div style="margin-bottom:70px;">
                        <div><span style="font-weight:700;color:blue;">대리점 : ${positions[i].title}</span></div>
                        <div><span style="font-weight:700;color:blue;">브랜드 : ${positions[i].brand}</span></div>
                        <div><span style="font-weight:700;color:blue;">전화번호 : ${positions[i].tel}</span></div>
                        <div><span style="font-weight:700;color:blue;">주소 : ${positions[i].address}</span></div>
                        </div>
                    </div>
                `;
                
                var infowindow = new kakao.maps.InfoWindow({
                    content: contentString // 인포윈도우에 표시할 내용
                });
            
                // 마커 클릭 이벤트를 등록하여 인포윈도우를 표시
                (function(marker, infowindow) {
                    kakao.maps.event.addListener(marker, 'click', function() {
                        // 모든 인포윈도우 닫기
                        closeAllInfoWindows();
                        // 새로운 인포윈도우 열기
                        infowindow.open(map, marker);
                        // 열린 인포윈도우 배열에 추가
                        openInfoWindows.push(infowindow);
                    });
                })(marker, infowindow);
            }
    
        });
    } else {
        // 브라우저가 Geolocation을 지원하지 않는 경우 처리
        alert('Geolocation을 지원하지 않는 브라우저입니다.');
    }
}

initializeMap(agenciesArray);
