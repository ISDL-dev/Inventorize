import { useNavigate, useParams } from "react-router-dom";
import { Box, Heading, Image, Text, Button, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";

//仮データ
/*const equipuments = [
    { id: 1, name: "ノートパソコン", imageUrl: "/images/laptop.jpg", location: "棚A" },
    { id: 2, name: "プロジェクター", imageUrl: "/images/projector.jpg", location: "棚B" },
    { id: 3, name: "HDMIケーブル", imageUrl: "/images/hdmi.jpg", location: "棚C" },
    { id: 4, name: "マウス", imageUrl: "/images/mausu.jpg", location: "棚D" },
    { id: 5, name: "キーボード", imageUrl: "/images/keyboard.jpg", location: "棚E" },
    { id: 6, name: "ディスプレイ", imageUrl: "/images/display.jpg", location: "棚F" },
    { id: 7, name: "Webカメラ", imageUrl: "/images/camera.jpg", location: "棚G" },
    { id: 8, name: "ヘッドセット", imageUrl: "/images/headset.jpg", location: "棚H" },
    { id: 9, name: "スピーカー", imageUrl: "/images/supi-ka-.jpg", location: "棚I" },
    { id: 10, name: "LANケーブル", imageUrl: "/images/lan.jpg", location: "棚J" },
    { id: 11, name: "USBハブ", imageUrl: "/images/usb.jpg", location: "棚K" },
  ];*/
type Item = {
  id: number;
  name: string;
  imageUrl: string;
  location: string;
};

const ItemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("詳細取得エラー:", err);
        setLoading(false);
      });
  }, [id]);

  if(loading) {
    return <Spinner size="xl" />
  }
  if(!item) {
    return <Text>指示された物品が見つかりません</Text>
  }

  return (
    <Box p={8}>
      <Heading mb={4}>{item.name}</Heading>
      
      {/* 画像（クリックで拡大） */}
      <Image src={item.imageUrl || "/images/noImage.jpg"} alt={item.name} boxSize="300px" objectFit="cover" mb={4} cursor="pointer" onClick={() => setIsZoomed(true)} onError={(e) => {(e.target as HTMLImageElement).src = "/images/noImage.jpg"}}/>

      <Text fontSize="lg">保管場所: {item.location}</Text>

      {/* 戻るボタン */}
      <Button mt={6} onClick={() => navigate("/equipuments")} color="black" bg="gray.300" _hover={{ bg: "gray.400"}}>
         戻る（Equipumentsページに移動）
      </Button>

      {/* 拡大表示（Modalの代替） */}
      {isZoomed && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="blackAlpha.800"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="1000"
          onClick={() => setIsZoomed(false)}
        >
          <Image
            src={item.imageUrl}
            alt={item.name}
            maxW="90%"
            maxH="90%"
            objectFit="contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/noImage.jpg";
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ItemDetailPage;
